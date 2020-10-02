import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import {
    map,
} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CONSTS } from 'src/app/app.constants';
import {
    ICmsJwtPayload,
    IRefreshTokenJwtResponse,
} from './model/cms.model';

@Injectable({
    providedIn: 'root',
})
export class CmsService {
    private tokenJwtResponse: IRefreshTokenJwtResponse;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {}

    public getNewToken = () => {
        const body = new URLSearchParams();
        body.append('grant_type', CONSTS.CMS.GRAND_TYPE);
        body.append('client_id', CONSTS.CMS.CLIENT_ID);
        body.append('client_secret', CONSTS.CMS.CLIENT_SECRET);
        body.append('scope', CONSTS.CMS.SCOPE);

        return this.http.post(
                `https://squidex.lnd.bz/identity-server/connect/token`,
                body.toString(),
                {
                    headers: {
                        responseType: 'json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            )
            .pipe(
                map((cmsPayload: IRefreshTokenJwtResponse) => {
                    this.manageJwtToken(cmsPayload);
                }),
            );
    }

    private manageJwtToken = (tokenJwtResponse: IRefreshTokenJwtResponse) => {
        this.tokenJwtResponse = tokenJwtResponse;
    }

    public getAuthorizationHeaders = () => {
        return `${this.tokenJwtResponse.token_type} ${this.tokenJwtResponse.access_token}`;
    }
}
