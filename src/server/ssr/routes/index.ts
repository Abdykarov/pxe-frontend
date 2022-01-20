import * as express from 'express';
import angularRoutes from 'src/server/ssr/routes/angular.routes';
import mockRoutes from 'src/server/ssr/routes/mock.routes';
import siteMap from 'src/server/ssr/routes/sitemap.routes';
import squidex from 'src/server/ssr/routes/squidex.routes';
import staticRoutes from 'src/server/ssr/routes/static.routes';

const router = express.Router();

router.post('/cms/*', squidex);
router.get('/sitemap.xml', siteMap);
router.get('/graphql', mockRoutes);
router.get('*.*', staticRoutes);
router.get('*', angularRoutes);

export default router;
