import { createWindow } from 'domino';
import { readFileSync } from 'fs';
import { join } from 'path';
import { DIST_FOLDER } from 'src/server/shared/consts';

export const initGlobalVariables = (): void => {
    const template = readFileSync(
        join(DIST_FOLDER, 'app', 'index.html')
    ).toString();
    const win = createWindow(template);

    win['angularDevstack'] = {};
    win['angularDevstack']['config'] = global['config'];

    // create global variables
    // @ts-ignore
    global['window'] = win;
    global['document'] = win.document;
    global['navigator'] = win.navigator;
    // @ts-ignore
    global['HTMLAnchorElement'] = () => null;

    global['window'].HTMLElement.prototype.getBoundingClientRect = () => null;
};
