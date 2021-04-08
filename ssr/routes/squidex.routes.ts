import * as express from 'express';

import squidexController from 'ssr/controllers/squidex.controller';

const router = express.Router();

router.get('/cms-api', squidexController.cmsApi);
router.post('/cms-api', squidexController.deleteCache);

export default router;
