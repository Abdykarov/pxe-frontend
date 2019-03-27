import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { staticNavigationConfig } from './config/navigation.config';

@Component({
    selector: 'lnd-root',
    templateUrl: './static.component.html',
    styleUrls: ['./static.component.scss'],
})
export class StaticComponent {

    public isMenuOpen = false;
    public itemOpened = null;
    public navigationConfig = [];

    constructor (
        public router: Router,
    ) {
        this.navigationConfig = staticNavigationConfig;
    }

    toggleMenuOpen () {
        this.isMenuOpen = !this.isMenuOpen;
    }

    toggleOpenItem (itemOpened) {
        this.itemOpened = itemOpened;
    }
}
