import { isPlatformBrowser } from '@angular/common';
import {
    Directive,
    Inject,
    PLATFORM_ID,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

@Directive({
    selector: '[lndOnlySsr]',
})
export class OnlySsrDirective {
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}
