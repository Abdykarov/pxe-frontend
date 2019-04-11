import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    PLATFORM_ID,
} from '@angular/core';
import {
    DOCUMENT,
    isPlatformBrowser,
} from '@angular/common';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { GTMService } from './services/gtm.service';

@Component({
    selector: 'lnd-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(
        private gtmService: GTMService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            const script = this.document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gtmId;
            this.document.head.prepend(script);
        }

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtmService.gtm(event);
            }
        });
    }
}
