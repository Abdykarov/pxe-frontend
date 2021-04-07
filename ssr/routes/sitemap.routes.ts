import * as express from 'express';
import siteMap from '../controllers/sitemap.controller';

const router = express.Router();

router.get('/sitemap.xml', siteMap.sitemap);

export default router;
