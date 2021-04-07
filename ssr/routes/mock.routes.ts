import * as express from 'express';
import mockController from '../controllers/mock.controller';

const router = express.Router();

router.get('/graphql', mockController.graphql);

export default router;
