import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ROUTES } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { ILoginResponse } from 'src/app/services/model/auth.model';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { OAuthService } from 'src/app/services/o-auth.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

/**
 * Process login by oauth
 * GOOGLE send token to BE -> redirect here
 */
@Component({
    templateUrl: './o-auth-layout.component.html',
    styleUrls: ['./o-auth-layout.component.scss'],
})
export class OAuthLayoutComponent extends AbstractComponent {
    constructor(
        private authService: AuthService,
        private oAuthService: OAuthService,
        private navigateConsumerService: NavigateConsumerService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super();
        const queryParams: ILoginResponse = <ILoginResponse>(
            this.route.snapshot.queryParams
        );

        if (this.oAuthService.isSuccessRedirectURI(queryParams)) {
            const extras: NavigationExtras = {
                ...this.authService.loginExtras,
            };

            const supplyPointId = queryParams.supplyPointId;
            if (supplyPointId) {
                extras.queryParams = {
                    supplyPointId,
                };
            }

            this.oAuthService.processLogin(queryParams);
            this.router.navigate(
                [this.authService.routerAfterLogin(queryParams)],
                extras
            );
        } else {
            const isLogged = this.authService.isLogged();
            const isFromOAuthBankIdVerified = !!queryParams.supplyPointId;
            if (isFromOAuthBankIdVerified && isLogged) {
                this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                    ProgressStatus.WAITING_FOR_PAYMENT,
                    queryParams
                );
            } else {
                this.router.navigate([ROUTES.ROUTER_LOGIN], { queryParams });
            }
        }
    }
}
