import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { staticNavigationConfig } from 'src/static/config/navigation.config';
import { IRouterData } from 'src/app/layouts/model/router-data';

@Component({
    templateUrl: './basic-layout.component.html',
})
export class BasicLayoutComponent {

    public isMenuOpen = false;
    public itemOpened = null;
    public navigationConfig = [];
    public routerData: IRouterData = {
        isPublic: false,
        isSimpleFooter: false,
        showSignIn: true,
        showLogin: false,
    };

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
