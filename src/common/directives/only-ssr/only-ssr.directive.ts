import { isPlatformBrowser } from '@angular/common';
import {
    Directive,
    Inject,
    PLATFORM_ID,
    ViewContainerRef,
} from '@angular/core';

@Directive({
    selector: '[lndOnlySsr]',
})
export class OnlySsrDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        if (!isPlatformBrowser(this.platformId)) {
            this.viewContainer.clear();
        }
    }
}
