import 'zone.js/node';
import 'cross-fetch/polyfill';

import { enableProdMode } from '@angular/core';

import { initGlobalVariables } from './utils/init-global';
import { loadConfig } from './utils/config';

loadConfig();
initGlobalVariables();
enableProdMode();

import './jobs/appState';
