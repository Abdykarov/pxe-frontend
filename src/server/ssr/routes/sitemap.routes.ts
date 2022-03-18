import * as express from 'express';
import siteMap from 'src/server/ssr/controllers/sitemap.controller';

const router = express.Router();

router.get('/sitemap.xml', siteMap.sitemap);

export default router;
