import './init';

/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
import {DIST_FOLDER, PORT} from './consts';
import router from './routes/index';
// Musi byt pod global['window'] --> jinak window undefined u file replacmentu
import { AppServerModule } from '../src/app.server';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
}));
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

server.use('/', router);

// Start up the Node server
server.listen(PORT, () => console.log('Listing', PORT));

export * from '../src/app.server';
