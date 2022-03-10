import * as express from 'express';
import { CONSTS } from 'src/app/app.constants';
import angularController from 'src/server/ssr/controllers/angular.controller';

const router = express.Router();

router.get(
    new RegExp(`${CONSTS.PATHS.SECURED}.*`),
    angularController.withoutSSR
);
router.get(`/${CONSTS.PATHS.O_AUTH}`, angularController.withoutSSR);
router.get('*', angularController.withSSR);

export default router;
