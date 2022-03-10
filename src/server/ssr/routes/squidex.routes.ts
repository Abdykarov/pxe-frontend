import * as express from 'express';
import squidexController from 'src/server/ssr/controllers/squidex.controller';

const router = express.Router();

router.post('/cms/api', squidexController.cmsApi);
router.post('/cms/delete-cache', squidexController.deleteCache);

export default router;
