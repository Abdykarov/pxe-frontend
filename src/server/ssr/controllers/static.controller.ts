import * as express from 'express';
import { join } from 'path';
import { DIST_FOLDER } from 'src/server/shared/consts';

const controller = {
    staticFiles: express.static(join(DIST_FOLDER, 'app')),
};

export default controller;
