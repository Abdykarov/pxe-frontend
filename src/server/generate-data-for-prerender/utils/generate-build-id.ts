import { writeFileSync } from 'fs';

export const generateBuildId = (): void => {
    const time = new Date().getTime();
    writeFileSync('dist/data/build-id.text', time.toString(), 'utf-8');
};
