import { join } from 'path';

export const DIST_FOLDER = join(process.cwd(), 'dist');
export const APP_FOLDER = join(DIST_FOLDER, 'app');
export const PORT = process.env.PORT || 80;
export const THE_MOST_SECRET_PASSWORD_IN_HOGWARTS_TO_RESET_CACHE =
    'Voldemort123_NovaPolhora22*%ˇ-:)))ˇ(_HOGWARTS';

export const PAGE_M_CACHE_PREFIX = 'PAGE_';
export const SQUIDEX_M_CACHE_PREFIX = 'SQUIDEX_';
