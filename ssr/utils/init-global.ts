import { readFileSync } from 'fs';
import { join } from 'path';
import { createWindow } from 'domino';

import { DIST_FOLDER } from 'ssr/consts';

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
