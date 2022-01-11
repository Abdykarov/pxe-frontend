import fs, { WriteStream } from 'fs';
import { join } from 'path';
import { CONSTS, ROUTES } from 'src/app/app.constants';
import { DIST_FOLDER, getConfig } from './config';

const dateForSecuredPages = [
    ROUTES.ROUTER_DASHBOARD,
    ROUTES.ROUTER_REQUEST_CONTRACT,
    ROUTES.ROUTER_REQUEST_OFFER_SELECTION,
];

const routersToAdd = [CONSTS.PATHS.FAQ, CONSTS.PATHS.PATTERNS_OF_CONTRACTS];

const fromSitemap = (sitemap: string, fs: WriteStream) => {
    const regexForRoutesInSitemap = new RegExp(
        `<loc>${getConfig()['url']}/(.*?)</loc>`,
        'g'
    );
    let occurrences = [];
    const fileContent: string[] = [];
    while (null != occurrences) {
        occurrences = regexForRoutesInSitemap.exec(sitemap);
        if (occurrences !== null) {
            fileContent.push(occurrences[1]); // ouput: "a"
        }
    }

    fileContent.forEach((route) => {
        fs.write(`/${route}\n`);
    });
};

const securedPagesRoutes = (file: WriteStream) => {
    dateForSecuredPages.forEach((forPage) =>
        file.write(
            `/${CONSTS.PATHS.GENERATE_DATA}/${encodeURIComponent(forPage)}\n`
        )
    );
};

const generateAdditionalRoutes = (file: WriteStream) => {
    routersToAdd.forEach((helpRoute) => file.write(`/${helpRoute}\n`));
};

export const generateRoutes = (sitemap: string) => {
    const file = fs.createWriteStream(join(DIST_FOLDER, 'data', 'routes.txt'));
    //lp
    file.write('/' + '\n');

    fromSitemap(sitemap, file);
    securedPagesRoutes(file);
    generateAdditionalRoutes(file);

    file.end();
};
