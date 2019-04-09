import { Component } from '@angular/core';
import {
    Router,
    NavigationEnd,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { NavigationService } from './services/navigation.service';

declare var gtag;

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent {
    constructor(
        private navigationService: NavigationService,
        private router: Router,
    ) {
        this.navigationService.getNavigationConfig();

        this.router.events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    gtag('config', environment.gtmId, {
                        'page_path': event.urlAfterRedirects,
                    });
                }
            });
    }
}
