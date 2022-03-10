import '@angular/localize/init';
// Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { join } from 'path';
// Musi byt definovaný global['window'] --> jinak window undefined u file replacmentu
import { AppServerModule } from 'src/app.server';
import { DIST_FOLDER, PORT } from 'src/server/shared/consts';
import 'src/server/shared/init';
import router from 'src/server/ssr/routes';

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModule,
    })
);
server.set('view engine', 'html');
server.set('views', join(DIST_FOLDER, 'app'));

server.use('/', router);
// Start up the Node server
server.listen(PORT, () => console.log('Listing', PORT));
export * from 'src/app.server';
