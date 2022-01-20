import { readFileSync } from 'fs';
import { join } from 'path';
import { DIST_FOLDER } from 'src/server/shared/consts';

export const loadConfig = () => {
    // create configuration
    const configJs = readFileSync(
        join(DIST_FOLDER, 'data', 'config.js')
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
