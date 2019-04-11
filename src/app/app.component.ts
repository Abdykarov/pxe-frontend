import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser} from '@angular/common';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'lnd-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const script = this.document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gtmId;
            this.document.head.prepend(script);
        }
    }
}
