import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';

/**
 * Generate cache parameter for static assets.
 */
export const buildIdFactory = (meta: Meta, platformId: string) => {
    if (isPlatformBrowser(platformId)) {
        return meta.getTag("name='build-id'")?.content;
    }
};
