import * as express from 'express';
import squidexController from '../controllers/squidex.controller';

const router = express.Router();

router.get('/cms-api', squidexController.cmsApi);

export default router;
