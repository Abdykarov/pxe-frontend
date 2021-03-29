import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { ILoginResponse } from './model/auth.model';
import { OAuthType } from 'src/app/models/oAuth/oAuth.model';
import {oAuthApiError} from '../../common/constants/errors.constant';

@Injectable({
    providedIn: 'root',
})
export class OAuthService {

    constructor(
        private authService: AuthService,
    ) {}

    public isSuccessRedirectURI = (loginResponse: ILoginResponse): boolean => !!loginResponse?.token && !!loginResponse?.landingPage;

    public getError = (loginResponse: ILoginResponse): string => oAuthApiError[loginResponse?.error];

    public processLogin = (loginResponse: ILoginResponse): void => {
        this.authService.manageLoginResponse(loginResponse);
        this.authService.startRefreshTokenInterval();
        this.authService.startExpirationOfToken = new Date();
        this.authService.dontRefreshToken = true;
        this.authService.wasRefreshCallRefreshInterval = true;
    }

    public tryLoginWithOAuth = (oAuthType: OAuthType): void => {
        window.open(
            `${environment.url}/oauth2/authorize/${oAuthType}?redirect_uri=${environment.url}/login`,
            '_self',
        );
    }
}
