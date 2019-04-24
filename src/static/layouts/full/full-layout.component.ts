import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import {
    ISettings,
    LoginType,
    LogoutType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent {
    public settings: ISettings = {
        isPublic: true,
        isSimpleFooter: true,
        signInType: SignType.STATIC,
        loginType: LoginType.NONE,
        logoutType: LogoutType.NONE,
    };

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.settings = <ISettings>this.route.snapshot.firstChild.data;
                console.log(this.settings);
            }
        });
    }
}
