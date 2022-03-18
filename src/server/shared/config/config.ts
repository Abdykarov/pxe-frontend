import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { APP_FOLDER, DIST_FOLDER } from 'src/server/shared/consts';

export const loadConfig = (): void => {
    // create configuration

    const preRenderPathConfig = join(DIST_FOLDER, 'data', 'config.js');
    const ssrPathConfig = join(
        APP_FOLDER,
        'assets',
        'configurations',
        'config.js'
    );

    const isPrerender = existsSync(preRenderPathConfig);

    const configJs = readFileSync(
        isPrerender ? preRenderPathConfig : ssrPathConfig
    ).toString();
    const configString = configJs.substring(
        configJs.indexOf('= ') + 1,
        configJs.indexOf(';')
    );
    global['config'] = JSON.parse(configString).config;
};

export const getConfig = (): any => {
    if (global['config'] === undefined) {
        loadConfig();
    }
    return global['config'];
};
