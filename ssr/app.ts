// import {PAGE_M_CACHE_PREFIX} from './consts';
import http from 'http';

export const PAGE_M_CACHE_PREFIX = 'PAGE_';

/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
console.log('INIT');
import * as mCache from 'memory-cache';
export const getMCacheKeyPage = (page) => `${PAGE_M_CACHE_PREFIX}_${page}`;

import '@angular/localize/init';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import 'zone.js/dist/zone-node';

import 'cross-fetch/polyfill';
import * as express from 'express';
import { createWindow } from 'domino';
import { join } from 'path';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';
import * as cron from 'cron';
// import router from './routes/index';
const CronJob = cron.CronJob;
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
export const DIST_FOLDER = join(process.cwd(), 'dist');
export const APP_FOLDER = join(DIST_FOLDER, 'app');
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
export const plainConfig = config.config;
win['angularDevstack'] = {};
win['angularDevstack']['config'] = plainConfig;

// create global variables
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;
global['HTMLAnchorElement'] = () => null;

global['window'].HTMLElement.prototype.getBoundingClientRect = () => null;

enableProdMode();

// Musi byt pod global['window'] --> jinak window undefined u file replacmentu
import { AppServerModule } from '../src/app.server';
import {IncomingMessage, NextFunction} from 'connect';

const PORT = process.env.PORT || 80;

server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

console.log('PORT');
console.log(PORT);

server.use((req: IncomingMessage, res: http.ServerResponse, next: NextFunction): void => {
    console.log('VOLAM NEXT');
    next();
});
server.get('*.*', express.static(join(DIST_FOLDER, 'app')));



// server.use('*', router);

// Start up the Node server
server.listen(PORT, () => {
    console.log('ASDA');
    console.log(PORT);
});


export * from '../src/app.server';
