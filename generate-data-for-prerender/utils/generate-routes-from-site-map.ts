import fs from 'fs';
import { getConfig } from './config';

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
    var file = fs.createWriteStream('dist/data/routes.txt');
    file.write('/' + '\n');
    fileContent.forEach(function (v) {
        file.write('/' + v + '\n');
    });
    file.end();
};
