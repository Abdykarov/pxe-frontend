import {join} from 'path';
import * as express from 'express';
import {DIST_FOLDER} from '../consts';

const controller = {
    staticFiles: express.static(join(DIST_FOLDER, 'app')),
};

export default controller;
