import { join } from 'path';
import { readFileSync } from 'fs';

import { DIST_FOLDER } from 'ssr/consts';

export const loadConfig = () => {
    // create configuration
    const configJs = readFileSync(join(DIST_FOLDER, 'app', 'assets', 'configurations', 'config.js')).toString();
    const configString = configJs.substring(
        configJs.indexOf('= ') + 1,
        configJs.indexOf(';'),
    );
    global['config'] = JSON.parse(configString).config;
};

export const getConfig = () => global['config'];
