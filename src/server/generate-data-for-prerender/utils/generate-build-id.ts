import { readFileSync, writeFileSync } from 'fs';

export const generateBuildId = (): void => {
    const time = new Date().getTime();
    writeFileSync('dist/data/build-id.text', time.toString(), 'utf-8');
    const indexToUpdate = readFileSync('src/index.html', 'utf-8');
    const updatedIndex = indexToUpdate.replace(
        '<meta name="build-id" content="123456" />',
        `<meta name="build-id" content="${time}" />`
    );
    writeFileSync('src/index.html', updatedIndex, 'utf-8');
};
