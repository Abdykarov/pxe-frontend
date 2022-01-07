import fs from 'fs';
import { join } from 'path';
import { CONSTS, ROUTES } from '../../src/app/app.constants';
import { DIST_FOLDER, getConfig } from './config';

export const routersToAdd = [CONSTS.PATHS.FAQ, ROUTES.ROUTER_DASHBOARD];

export const generateRoutesFromSiteMap = (sitemap: string) => {
    const regex = new RegExp(`<loc>${getConfig()['url']}/(.*?)</loc>`, 'g');
    let z = [];
    const fileContent = [];
    while (null != z) {
        z = regex.exec(sitemap);
        if (z !== null) {
            fileContent.push(z[1]); // ouput: "a"
        }
    }
    var file = fs.createWriteStream(join(DIST_FOLDER, 'data', 'routes.txt'));
    file.write('/' + '\n');
    fileContent.forEach(function (v) {
        file.write('/' + v + '\n');
    });
    routersToAdd.forEach(function (v) {
        file.write(
            '/' +
                CONSTS.PATHS.GENERATE_DATA +
                '?page=' +
                encodeURIComponent(v) +
                '\n'
        );
    });
    file.end();
};
