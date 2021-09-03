import * as express from 'express';

import angularController from 'ssr/controllers/angular.controller';
import { CONSTS } from '../../src/app/app.constants';

const router = express.Router();

router.get(new RegExp(`${CONSTS.PATHS.SECURED}.*`), angularController.withoutSSR);
router.get(`/${CONSTS.PATHS.O_AUTH}`, angularController.withoutSSR);
router.get('*', angularController.withSSR);

export default router;
