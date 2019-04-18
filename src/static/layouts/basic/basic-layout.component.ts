import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { staticNavigationConfig } from 'src/static/config/navigation.config';
import { ISettings, SignType } from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './basic-layout.component.html',
})
export class BasicLayoutComponent {

    public isMenuOpen = false;
    public itemOpened = null;
    public navigationConfig = [];
    public settings: ISettings = {
        isPublic: false,
        isSimpleFooter: false,
        signInType: SignType.STATIC,
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
