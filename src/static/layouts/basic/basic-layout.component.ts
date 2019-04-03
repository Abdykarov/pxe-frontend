import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { staticNavigationConfig } from '../../config/navigation.config';

@Component({
    templateUrl: './basic-layout.component.html',
})
export class BasicLayoutComponent {

    public isMenuOpen = false;
    public itemOpened = null;
    public navigationConfig = [];

    constructor (
        public router: Router,
    ) {
        this.navigationConfig = staticNavigationConfig;
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.isMenuOpen = false;
            }
        });
    }

    toggleMenuOpen () {
        this.isMenuOpen = !this.isMenuOpen;
    }

    toggleOpenItem (itemOpened) {
        this.itemOpened = itemOpened;
    }
}
