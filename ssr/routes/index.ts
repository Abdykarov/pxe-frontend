import * as express from 'express';
import angularRoutes from './angular.routes';
import squidex from './squidex.routes';
import siteMap from './sitemap.routes';
import mockRoutes from './mock.routes';
import staticRoutes from './static.routes';

const router = express.Router();

router.get('/cms-api', squidex);
router.get('/sitemap.xml', siteMap);
router.get('/graphql', mockRoutes);
router.get('*.*', staticRoutes);
router.get('*', angularRoutes);

export default router;
