import { Injectable } from '@angular/core';
import { CONSTS } from 'src/app/app.constants';
import { OAuthType } from 'src/app/models/o-auth/oAuth.model';
import { oAuthApiError } from 'src/common/constants/errors.constant';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { ILoginResponse } from './model/auth.model';

@Injectable({
    providedIn: 'root',
})
export class OAuthService {
    constructor(private authService: AuthService) {}

    public isSuccessRedirectURI = (loginResponse: ILoginResponse): boolean =>
        !!loginResponse?.token && !!loginResponse?.landingPage;

    public getError = (error): string => oAuthApiError[error];

    public processLogin = (loginResponse: ILoginResponse): void => {
        this.authService.manageLoginResponse(loginResponse);
        this.authService.startRefreshTokenInterval();
        this.authService.startExpirationOfToken = new Date();
        this.authService.dontRefreshToken = true;
        this.authService.wasRefreshCallRefreshInterval = true;
    };

    public tryLogin = (oAuthType: OAuthType): void => {
        window.open(
            `${environment.url}/oauth2/authorize/${oAuthType}?redirect_uri=${environment.url}/${CONSTS.PATHS.O_AUTH}`,
            '_self'
        );
    };

    public tryVerifyAccount = (supplyPointId: string): void => {
        window.open(
            `${environment.url}/oauth2/authorize/${OAuthType.BANK_ID}?redirect_uri=${environment.url}/${CONSTS.PATHS.O_AUTH}?supplyPointId=${supplyPointId}`,
            '_self'
        );
    };
}
