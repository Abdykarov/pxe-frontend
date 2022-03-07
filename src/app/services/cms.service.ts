import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { map } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { IRefreshTokenJwtResponse } from 'src/app/services/model/cms.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CmsService {
    private tokenJwtResponse: IRefreshTokenJwtResponse;

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: string
    ) {}

    public getNewToken = () => {
        if (!this.tokenJwtResponse) {
            const body = new URLSearchParams();
            body.append('grant_type', environment['cms']['grand_type']);
            body.append('client_id', environment['cms']['client_id']);
            body.append('client_secret', environment['cms']['client_secret']);
            body.append('scope', environment['cms']['scope']);

            return this.http
                .post(
                    `${environment.url_cms_local}/${CONSTS.CMS.REFRESH_TOKEN_URL}`,
                    body.toString(),
                    {
                        headers: {
                            responseType: 'json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                )
                .pipe(
                    map((tokenJwtResponse: IRefreshTokenJwtResponse) => {
                        this.tokenJwtResponse = tokenJwtResponse;
                    })
                );
        }
    };

    public getAuthorizationHeaders = () => {
        return `${this.tokenJwtResponse.token_type} ${this.tokenJwtResponse.access_token}`;
    };
}
