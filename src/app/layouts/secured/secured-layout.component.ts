import { Component } from '@angular/core';
import {
    Router,
    NavigationEnd,
} from '@angular/router';

import { NavigationService } from './services/navigation.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent {
    constructor(
        private navigationService: NavigationService,
        private router: Router,
    ) {
        this.navigationService.getNavigationConfig();

        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    console.log('SECURED LAYOUT: NAVIGATION END');
                }
            });
    }
}
