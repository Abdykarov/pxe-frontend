import { join } from 'path';

export const DIST_FOLDER = join(process.cwd(), 'dist');
export const PORT = process.env.PORT || 80;
