import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent extends AbstractComponent {
    public settings: ISettings = {
        isPublic: true,
        isLandingPage: false,
        isSimpleFooter: true,
        isSupplier: false,
        isStatic: true,
        signUpType: SignType.STATIC,
        hideLeftNavigation: false,
        loginType: LoginType.NONE,
    };

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.settings = <ISettings>this.route.snapshot.firstChild.data;
                }
            });
    }

    public homeRedirect = () => {
        this.router.navigate([CONSTS.PATHS.EMPTY]);
    }
}
