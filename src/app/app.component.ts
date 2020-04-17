import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    PLATFORM_ID,
    ElementRef,
    OnInit,
} from '@angular/core';
import {
    DOCUMENT,
    isPlatformBrowser,
} from '@angular/common';
import {
    NavigationEnd,
    Router,
} from '@angular/router';
import { CONSTS } from 'src/app/app.constants';

import { environment } from 'src/environments/environment';
import { OnlyOneTabActiveService } from 'src/app/services/only-one-tab-active.service';
import { GTMService } from './services/gtm.service';

@Component({
    selector: 'lnd-root',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    constructor(
        private elementRef: ElementRef,
        private gtmService: GTMService,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        if (isPlatformBrowser(this.platformId)) {
            window.addEventListener('beforeunload', (e) => {
                if (onlyOneTabActiveService.isThisTabActive()) {
                    onlyOneTabActiveService.setActiveTab(CONSTS.ONLY_ONE_TAB_ACTIVE.CLOSED);
                }
            });


            if (!environment.gtmId) {
                return;
            }

            const script = this.document.createElement('script');
            script.async = true;
            // GTM
            script.src = 'https://www.googletagmanager.com/gtm.js?id=' + environment.gtmId;
            // GA
            // script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gaId;
            this.document.head.prepend(script);

            this.gtmService.init();

            this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    gtmService.gtm(event);
                    // gaService.gtm(event);
                }
            });
        }
    }

    ngOnInit(): void {
        if (environment.production) {
            this.elementRef.nativeElement.removeAttribute('ng-version');
        }
    }
}
