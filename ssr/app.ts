console.log(1000);
import './init';
console.log(0);
import '@angular/localize/init';
console.log(1);
// Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
import { ngExpressEngine } from '@nguniversal/express-engine';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';
console.log(2);
import {
    DIST_FOLDER,
    PORT,
} from './consts';
import router from './routes/index';
console.log(3);
// Musi byt definovaný global['window'] --> jinak window undefined u file replacmentu
import { AppServerModule } from '../src/app.server';
console.log(4);
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
console.log(5);
server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
console.log(6);
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

server.use('/', router);
console.log(7);
// Start up the Node server
server.listen(PORT, () => console.log('Listing', PORT));
console.log(8);
export * from '../src/app.server';
