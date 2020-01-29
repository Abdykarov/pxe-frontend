import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class WindowService {

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {}

    public goToLink(url: string) {
        if (isPlatformBrowser(this.platformId)) {
            window.open(url, '_blank');
        }
    }
}
