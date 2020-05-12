/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import 'cross-fetch/polyfill';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

const server = express();

const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_FOLDER = join(DIST_FOLDER, 'app');
// ssr DOM
import { createWindow } from 'domino';

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

import { AppServerModule } from './src/app.server';

server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

// TODO: implement data requests securely
server.get('/graphql', (req, res) => {
    res.status(404).send('data requests are not supported');
});

// Server static files from /app
server.get('*.*', express.static(join(DIST_FOLDER, 'app')));

// All routes are rendered as server side routes use the Universal engine
server.get('*', (req, res, next) => {
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
server.get('*', (req, res) => {
    return res.sendFile(join(APP_FOLDER, 'index.html'));
});

// Start up the Node server
server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
});

export * from './src/app.server';
