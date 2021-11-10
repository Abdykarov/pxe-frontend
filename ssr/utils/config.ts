import { readFileSync } from 'fs';
import { join } from 'path';
export const DIST_FOLDER = join(process.cwd(), 'dist');

export const loadConfig = () => {
    // create configuration

    console.log("123-")
    const configJs = readFileSync(
        join(DIST_FOLDER, 'app', 'assets', 'configurations', 'config.js')
    ).toString();
    console.log("123--")
    const configString = configJs.substring(
        configJs.indexOf('= ') + 1,
        configJs.indexOf(';')
    );
    console.log("123----")
    console.log("123")
    console.log(configString)
    global['config'] = JSON.parse(configString).config;
};

export const getConfig = (): any => {
    if (global['config'] === undefined) {
        loadConfig();
    }
    return global['config'];
};
