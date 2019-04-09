import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { environment } from 'src/environments/environment';

declare var gtag;

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent {

    constructor(
        private router: Router,
    ) {
        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    gtag('config', environment.gtmId, {
                        'page_path': event.urlAfterRedirects,
                    });
                }
            });
    }
}
