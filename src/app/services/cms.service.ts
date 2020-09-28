import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { timer } from 'rxjs';
import {
    filter,
    map,
    switchMap,
} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import {
    ICmsJwtPayload,
    IRefreshTokenJwtResponse,
} from './model/cms.model';

@Injectable({
    providedIn: 'root',
})
export class CmsService {
    private tokenJwtResponse: IRefreshTokenJwtResponse;
    private cmsPayload: ICmsJwtPayload;

    public refreshTokenInterval$ =
        timer(0, CONSTS.CMS.REFRESH_TOKEN_INTERVAL);

    constructor(
        private http: HttpClient,
    ) {
        const cmsPayload = JSON.parse(localStorage.getItem(CONSTS.CMS.COOKIE_KEY));
        this.manageJwtToken(cmsPayload);

        this.refreshTokenInterval$.pipe(
            filter(_ => {
                if (this.tokenJwtResponse) {
                    return false;
                }

                return moment() < moment(this.cmsPayload.exp).add(-CONSTS.CMS.DAYS_FOR_REFRESH, 'days');
            }),
            switchMap(this.getNewToken),
        ).subscribe();
    }

    public getNewToken = () => {
        const body = new URLSearchParams();
        body.append('grant_type', CONSTS.CMS.GRAND_TYPE);
        body.append('client_id', CONSTS.CMS.CLIENT_ID);
        body.append('client_secret', CONSTS.CMS.CLIENT_SECRET);
        body.append('scope', CONSTS.CMS.SCOPE);

        return this.http.post(
                `${environment.url_cms}/identity-server/connect/token`,
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
                    localStorage.setItem(CONSTS.CMS.COOKIE_KEY, JSON.stringify(cmsPayload));
                    this.manageJwtToken(cmsPayload);
                }),
            );
    }

    private manageJwtToken = (cmsPayload: IRefreshTokenJwtResponse) => {
        this.tokenJwtResponse = cmsPayload;
        const jwtHelper = new JwtHelperService();
        this.cmsPayload = jwtHelper.decodeToken(this.tokenJwtResponse.access_token);
    }

    public getAuthorizationHeaders = () => `${this.tokenJwtResponse.token_type} ${this.tokenJwtResponse.access_token}`;
}
