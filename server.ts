// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as fs from 'fs';
import * as R from 'ramda';
import * as xml2js from 'xml2js';
import { join } from 'path';
import { readFileSync } from 'fs';

// ssr DOM
import { createWindow } from 'domino';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_FOLDER = join(DIST_FOLDER, 'app');

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

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP,
} = require('./dist/server/main');

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP),
    ],
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'app'));

// TODO: implement data requests securely
app.get('/graphql', (req, res) => {
    res.status(404).send('data requests are not supported');
});

const getTagUrl = (question, taqConfig) => {
    const foundTaq = taqConfig.find(taq => taq.type === question.tag);
    return foundTaq.url;
};

// Server static files from /app
app.get('/sitemap.xml', (req, res) => {
    const siteMapOriginal = fs.readFileSync(join(APP_FOLDER, 'sitemap.xml'), 'utf8');
    const taqConfig = JSON.parse(fs.readFileSync(join(APP_FOLDER, 'assets/static-data/faq.json'), 'utf8'));
    const questions = JSON.parse(fs.readFileSync(join(APP_FOLDER, 'assets/static-data/questions.json'), 'utf8'));
    const parseString = xml2js.parseString;
    parseString(siteMapOriginal, (err, result) => {
        questions.forEach(question => {
            const url = R.path(['urlset', 'url' ], result);
            if (url.length) {
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
app.get('*.*', express.static(join(DIST_FOLDER, 'app')));

// All routes are rendered as server side routes use the Universal engine
app.get('*', (req, res, next) => {
    // Catch secured routes as normal client side app
    if (req.originalUrl.indexOf('/secured') === 0) {
        return next();
    }
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
app.get('*', (req, res) => {
    return res.sendFile(join(APP_FOLDER, 'index.html'));
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
