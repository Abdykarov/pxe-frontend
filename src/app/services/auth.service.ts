import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { of } from 'rxjs';
import { map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CookiesService } from './cookies.service';
import {
    IJwtPayload,
    ILoginRequest,
    ILoginResponse,
    IUserRoles,
} from './model/auth.model';
import { environment } from 'src/environments/environment';
import { parseEmailFromUsername } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string;
    private cookieName = 'user';
    private expiresTime = 3600;

    constructor(
        private cookiesService: CookiesService,
        private http: HttpClient,
    ) {}

    checkLogin = () => {
        if (this.cookiesService.has(this.cookieName)) {
            this.token = (<any>this.cookiesService.getObject(this.cookieName)).token;
        } else {
            this.token = null;
        }
    }

    isLogged = (): boolean  => {
        return !!this.token;
    }

    login = ({username, password}: ILoginRequest) => {
        return this.http.post<ILoginResponse>(`${environment.url}/parc-rest/webresources/users/login`, { username, password })
            .pipe(
                map(response => {
                    if (response && response.token) {
                        if ( response.expiresTime ) {
                            this.expiresTime = response.expiresTime;
                        }
                        const user = {
                            token: response.token,
                        };
                        this.cookiesService.setObject(this.cookieName, user, this.expiresTime);
                        this.checkLogin();
                    }
                    return response;
                }),
            );
    }

    logout = () => {
        return this.http.get<any>(`${environment.url}/parc-rest/webresources/users/logout`)
            .pipe(
                map(response => {
                    this.token = null;
                    this.cookiesService.remove(this.cookieName);
                    return response;
                }),
            );
    }

    sendSupplierLoginSms = () => {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get<any>(`${environment.url}/parc-rest/webresources/sms/send`, httpOptions);
    }

    confirmSupplierLoginSms = ({code}) => {
        const httpOptions = {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'text/plain',
            }),
        };

        return this.http.post<any>(`${environment.url}/parc-rest/webresources/sms/confirm`, code, httpOptions);
    }

    isSupplier = () => {
        const jwtPayload = this.parseJwt();
        return jwtPayload.role === IUserRoles.PARC_SUPPLIER_P4R;
    }

    refreshToken = () => {
        // TODO refresh token logic
        return of(true);
    }

    getToken = (): string => this.token;

    getUserEmail = () => {
        const jwtPayload = this.parseJwt();
        const { username } = jwtPayload;
        return parseEmailFromUsername(username);
    }

    parseJwt = (): IJwtPayload => {
        const jwtHelper = new JwtHelperService();
        return jwtHelper.decodeToken(this.token);
    }
}

