import {DIST_FOLDER, PAGE_M_CACHE_PREFIX, SQUIDEX_M_CACHE_PREFIX} from './consts';
import {readFileSync} from 'fs';
import {join} from 'path';
import {createWindow} from 'domino';

export const getMCacheKeyPage = (page) => `${PAGE_M_CACHE_PREFIX}_${page}`;
export const getMCacheKeySquidex = (operationName) => `${SQUIDEX_M_CACHE_PREFIX}_${operationName}`;

export const getAuthorizationFromPayload = ({token_type, access_token}) => `${token_type} ${access_token}`;

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

export const initGlobalVariables = () => {
    const template = readFileSync(join(DIST_FOLDER, 'app', 'index.html')).toString();
    const win = createWindow(template);

    win['angularDevstack'] = {};
    win['angularDevstack']['config'] = global['config'];

    // create global variables
    global['window'] = win;
    global['document'] = win.document;
    global['navigator'] = win.navigator;
    global['HTMLAnchorElement'] = () => null;

    global['window'].HTMLElement.prototype.getBoundingClientRect = () => null;
};
