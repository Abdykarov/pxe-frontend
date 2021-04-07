import * as express from 'express';
import staticController from '../controllers/static.controller';

const router = express.Router();

router.get('*.*', staticController.staticFiles);

export default router;
