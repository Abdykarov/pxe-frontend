import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import {
    BehaviorSubject,
    Observable,
    of,
} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

import { CONSTS } from 'src/app/app.constants';
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
    private cookieName = 'user';
    private currentUserSubject$: BehaviorSubject<IJwtPayload>;
    public currentUser$: Observable<IJwtPayload>;
    private expiresTime = new Date().getTime() + (CONSTS.DEFAULT_EXPIRATION * 1000);
    private token: string;

    constructor(
        private cookiesService: CookiesService,
        private http: HttpClient,
    ) {
        const jwtPayload = this.getJwtPayload();
        this.currentUserSubject$ = new BehaviorSubject<IJwtPayload>(jwtPayload);
        this.currentUser$ = this.currentUserSubject$.asObservable();
    }

    public get currentUserValue(): IJwtPayload {
        return this.currentUserSubject$.value;
    }

    checkLogin = () => {
        if (this.cookiesService.has(this.cookieName)) {
            this.token = (<any>this.cookiesService.getObject(this.cookieName)).token;
        } else {
            this.token = null;
        }
    }

    isLogged = (): boolean  => {
        return true;
        return !!this.token;
    }

    login = ({username, password}: ILoginRequest) => {
        return this.http.post<ILoginResponse>(`${environment.url}/parc-rest/webresources/users/login`, { username, password })
            .pipe(
                map(response => {
                    if (response && response.token) {
                        const jwtPayload = this.getJwtPayload(response.token);
                        if (jwtPayload.exp) {
                            this.expiresTime = jwtPayload.exp;
                        }
                        const user = {
                            token: response.token,
                        };
                        this.cookiesService.setObject(this.cookieName, user, this.expiresTime);
                        this.checkLogin();
                        this.currentUserSubject$.next(jwtPayload);
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
                    this.currentUserSubject$.next(null);
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

    refreshToken = () => {
        // TODO refresh token logic
        return of(true);
    }

    getToken = (): string => this.token;

    private getJwtPayload = (token: string = null): IJwtPayload => {
        this.checkLogin();
        let jwtPayload: IJwtPayload = null;
        if (this.isLogged() || token) {
            token = token || this.token;
            try {
                const jwtHelper = new JwtHelperService();
                jwtPayload = jwtHelper.decodeToken(token);
                const { username, role } = jwtPayload;
                jwtPayload.email = parseEmailFromUsername(username);
                jwtPayload.supplier = role === IUserRoles.PARC_SUPPLIER_P4R;
            } catch (e) {
                this.token = null;
                this.cookiesService.remove(this.cookieName);
            }

        }
        return jwtPayload;
    }
}

