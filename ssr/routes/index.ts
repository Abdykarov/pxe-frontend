import * as express from 'express';

import angularRoutes from './angular.routes';
import mockRoutes from './mock.routes';
import squidex from './squidex.routes';
import siteMap from './sitemap.routes';
import staticRoutes from './static.routes';

const router = express.Router();

router.post('/cms/*', squidex);
router.get('/sitemap.xml', siteMap);
router.get('/graphql', mockRoutes);
router.get('*.*', staticRoutes);
router.get('*', angularRoutes);

export default router;
