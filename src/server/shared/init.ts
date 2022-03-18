import { enableProdMode } from '@angular/core';
import 'cross-fetch/polyfill';
import { loadConfig } from 'src/server/shared/config/config';
import { initGlobalVariables } from 'src/server/shared/utils/init-global';
import 'src/server/ssr/jobs/appState';
import 'zone.js/dist/zone-node';

loadConfig();
initGlobalVariables();
enableProdMode();
