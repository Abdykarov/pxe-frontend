import { readFileSync } from 'fs';
import { join } from 'path';
export const DIST_FOLDER = join(process.cwd(), 'dist');
export const loadConfig = () => {
    // create configuration
    const configJs = readFileSync(
        join(DIST_FOLDER, 'assets', 'configurations', 'config.js')
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
