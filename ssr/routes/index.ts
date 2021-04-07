import * as express from 'express';
import angularRoutes from './angularRoutes';

const router = express.Router();

router.use('*', angularRoutes);

export default router;
