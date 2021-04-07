import {enableProdMode} from '@angular/core';
import {initGlobalVariables, loadConfig} from './utils';

import 'zone.js/dist/zone-node';
import 'cross-fetch/polyfill';

loadConfig();
initGlobalVariables();
enableProdMode();

import './jobs/appState';
