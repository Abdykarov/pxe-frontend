import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';

export const buildIdFactory = (meta: Meta, platformId: string) => {
    if (isPlatformBrowser(platformId)) {
        return meta.getTag("name='build-id'")?.content;
    }
};
