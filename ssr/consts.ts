import {join} from 'path';

export const DIST_FOLDER = join(process.cwd(), 'dist');
export const APP_FOLDER = join(DIST_FOLDER, 'app');
export const PORT = 4200;

export const PAGE_M_CACHE_PREFIX = 'PAGE_';
export const SQUIDEX_M_CACHE_PREFIX = 'SQUIDEX_';
