/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import 'zone.js/dist/zone-node';

import 'cross-fetch/polyfill';
import * as express from 'express';
import { createWindow } from 'domino';
import * as fs from 'fs';
import * as R from 'ramda';
import * as xml2js from 'xml2js';
import { join } from 'path';
import { readFileSync } from 'fs';

const server = express();
const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_FOLDER = join(DIST_FOLDER, 'app');
// ssr DOM

// index from browser build!
const template = readFileSync(join(DIST_FOLDER, 'app', 'index.html')).toString();
const win = createWindow(template);

// create configuration
const configJs = readFileSync(join(DIST_FOLDER, 'app', 'assets', 'configurations', 'config.js')).toString();
const configString = configJs.substring(
    configJs.indexOf('= ') + 1,
    configJs.indexOf(';'),
);
const config = JSON.parse(configString);
win['angularDevstack'] = {};
win['angularDevstack']['config'] = config.config;

// create global variables
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['HTMLAnchorElement'] = () => null;

enableProdMode();

// Musi byt pod global['window'] --> jinak window undefined u file replacmentu
import { AppServerModule } from './src/app.server';

server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

// TODO: implement data requests securely
// server.get('/graphql', (req, res) => {
//     res.status(404).send('data requests are not supported');
// });

server.get('*', (req, res, next) => {
    console.log('ASD');
    console.log(req.url);
    console.log(req.originalUrl);
    return next();
});


const getTagUrl = (question, taqConfig) => {
    const foundTaq = taqConfig.find(taq => taq.type === question.tag);
    return foundTaq.url;
};

const getQuestions = (questions) => {
    if (!R.path(['angularDevstack', 'config', 'includeTestData'], window)) {
        return R.reject(R.propEq('isTestData')(true))(questions);
    }
    return questions;
};

// Server static files from /app
server.get('/sitemap.xml', (req, res) => {
    const siteMapOriginal = fs.readFileSync(join(APP_FOLDER, 'sitemap.xml'), 'utf8');
    const taqConfig = JSON.parse(fs.readFileSync(join(APP_FOLDER, 'assets/static-data/faq.json'), 'utf8'));
    let questions = JSON.parse(fs.readFileSync(join(APP_FOLDER, 'assets/static-data/questions.json'), 'utf8'));
    const parseString = xml2js.parseString;
    questions = getQuestions(questions);
    parseString(siteMapOriginal, (err, result) => {
        questions.forEach(question => {
            const url = R.path(['urlset', 'url' ], result);
            if (url && url.length) {
                url.push({
                    'loc': [
                        `${req.protocol}://${req.get('host')}/faq/${getTagUrl(question, taqConfig)}/${question.url}`,
                    ],
                });
            }
        });
        const builder = new xml2js.Builder();
        const xml = builder.buildObject(result);
        res.set('Content-Type', 'text/xml');
        return res.send(xml);
    });
});

// Server static files from /app
server.get('*.*', express.static(join(DIST_FOLDER, 'app')));

// All routes are rendered as server side routes use the Universal engine
server.get('*', (req, res, next) => {

    // Catch secured routes as normal client side app
    if (req.originalUrl.indexOf('/secured') === 0) {
        return next();
    }

    // console.log('ASDSAD');
    // console.log(res);
    // console.log(req);
    // console.log(req.originalUrl);
    // console.log(req.originalUrl.indexOf('/squidex.lnd'));
    // if (req.originalUrl.indexOf('/squidex.lnd') === 0) {
    //     console.log(req);
    //     console.log(res);
    //     console.log(next);
    //     console.log('___');
    // }

    res.render('index', {
        req: req,
        res: res,
        providers: [
            {
                provide: 'REQUEST',
                useValue: (req),
            },
            {
                provide: 'RESPONSE',
                useValue: (res),
            },
        ],
    });
});

// All routes (without server side routes) are send as normal client side app
server.get('*', (req, res) => {
    return res.sendFile(join(APP_FOLDER, 'index.html'));
});

// Start up the Node server
server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

export * from './src/app.server';
