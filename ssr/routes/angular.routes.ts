import * as express from 'express';

import angularController from 'ssr/controllers/angular.controller';

const router = express.Router();

router.get('*', angularController.public);
router.get('*', angularController.secured);

export default router;
