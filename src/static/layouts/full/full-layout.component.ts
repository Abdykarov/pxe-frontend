import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {
    public settings: ISettings = {
        isPublic: true,
        isSimpleFooter: true,
        isSupplier: false,
        signUpType: SignType.STATIC,
        loginType: LoginType.NONE,
    };

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.settings = <ISettings>this.route.snapshot.firstChild.data;
            }
        });
    }
}
