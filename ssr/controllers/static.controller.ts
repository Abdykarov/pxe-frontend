import * as express from 'express';
import { join } from 'path';

import { DIST_FOLDER } from 'ssr/consts';

const controller = {
    staticFiles: express.static(join(DIST_FOLDER, 'app')),
};

export default controller;
