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
import { join } from 'path';
import { readFileSync } from 'fs';
import * as bodyParser from 'body-parser';
import * as cron from 'cron';

const CronJob = cron.CronJob;
export const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
export const PORT = process.env.PORT || 80;
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

server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));
