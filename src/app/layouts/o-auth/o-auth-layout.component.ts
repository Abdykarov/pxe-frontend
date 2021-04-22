import {
    ActivatedRoute,
    NavigationExtras,
    Router,
} from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { ILoginResponse } from 'src/app/services/model/auth.model';
import { OAuthService } from 'src/app/services/OAuth.service';
import { ROUTES} from 'src/app/app.constants';

@Component({
    templateUrl: './o-auth-layout.component.html',
    styleUrls: ['./o-auth-layout.component.scss'],
})
export class OAuthLayoutComponent  {
    constructor(
        private authService: AuthService,
        private oAuthService: OAuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        const queryParams: ILoginResponse = <ILoginResponse>this.route.snapshot.queryParams;

        if (this.oAuthService.isSuccessRedirectURI(queryParams)) {
            this.oAuthService.processLogin(queryParams);
            this.router.navigate(
                [this.authService.routerAfterLogin(queryParams)],
                this.authService.loginExtras,
            );
        } else {
            this.router.navigate([ROUTES.ROUTER_LOGIN], { queryParams });
        }
    }
}
