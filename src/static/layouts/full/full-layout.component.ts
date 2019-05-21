import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import { CONSTS } from 'src/app/app.constants';
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
        isStatic: true,
        signUpType: SignType.STATIC,
        loginType: LoginType.NONE,
    };

    public signTypeNone = SignType.NONE;
    public loginTypeNone = LoginType.NONE;

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

    public homeRedirect = () => {
        this.router.navigate([CONSTS.PATHS.EMPTY]);
    }
}
