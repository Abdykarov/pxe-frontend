import {loadConfig} from './utils';
loadConfig();
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
import 'cross-fetch/polyfill';
import {readFileSync} from 'fs';
import {createWindow} from 'domino';
import {DIST_FOLDER} from './consts';
import {join} from 'path';

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

enableProdMode();

import './jobs/appState';
