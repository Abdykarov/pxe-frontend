import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {
    BehaviorSubject,
    interval,
    Observable,
    of,
    Subject,
} from 'rxjs';
import {
    catchError,
    filter,
    first,
    map,
    repeatWhen,
    switchMap,
    take,
    takeUntil,
} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { CookiesService } from './cookies.service';
import { environment } from 'src/environments/environment';
import {
    IJwtPayload,
    ILoginRequest,
    ILoginResponse,
    IUserRoles,
} from './model/auth.model';
import { IStateRouter } from 'src/app/pages/logout/logout-page.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private cookieName = 'user';
    private currentUserSubject$: BehaviorSubject<IJwtPayload>;
    public currentUser$: Observable<IJwtPayload>;
    private expiresTime = new Date().getTime() + (CONSTS.DEFAULT_EXPIRATION * 1000);
    private token: string;
    private uuid: string = null;
    private sessionUuid: string = null;

    public dontRefreshToken = false;
    private wasRefreshCallRefreshInterval = false;
    private readonly startRefreshTokenIntervalSubject$ = new Subject<void>();
    private readonly stopRefreshTokenIntervalSubject$ = new Subject<void>();
    private readonly stopMessageInterval = 'STOP_INTERVAL';

    public refreshTokenInterval$ =
        interval(CONSTS.REFRESH_INTERVAL_TOKEN)
            .pipe(
                switchMap((number) => {
                    if (!this.wasRefreshCallRefreshInterval) {
                        this.wasRefreshCallRefreshInterval = true;
                        if ( this.token) {
                            return this.refreshToken();
                        } else {
                            return of(this.stopMessageInterval);
                        }
                    }
                    return of(number);
                }),
                catchError(() => of(this.stopMessageInterval)),
                take(CONSTS.REFRESH_TOKEN_COUNT),
                takeUntil(this.stopRefreshTokenIntervalSubject$),
                repeatWhen(() => this.startRefreshTokenIntervalSubject$),
                filter((num) => {
                    if (num === this.stopMessageInterval) {
                        this.stopRefreshTokenInterval();
                        return false;
                    }
                    return true;
                }),
                switchMap(() => this.refreshToken()),
            );

    constructor(
        private cookiesService: CookiesService,
        private http: HttpClient,
        private router: Router,
    ) {
        const jwtPayload = this.getJwtPayload();
        this.currentUserSubject$ = new BehaviorSubject<IJwtPayload>(jwtPayload);
        this.currentUser$ = this.currentUserSubject$.asObservable();
        this.refreshTokenInterval$.subscribe();
    }

    startRefreshTokenInterval = () => {
        this.stopRefreshTokenInterval();
        this.startRefreshTokenIntervalSubject$.next();
    }

    stopRefreshTokenInterval = () => {
        this.stopRefreshTokenIntervalSubject$.next();
    }

    public get currentUserValue(): IJwtPayload {
        return this.currentUserSubject$.value;
    }

    public checkLogin = () => {
        if (this.cookiesService.has(this.cookieName)) {
            this.token = (<any>this.cookiesService.getObject(this.cookieName)).token;
            this.uuid = (<any>this.cookiesService.getObject(this.cookieName)).uuid;
        } else {
            this.token = null;
            this.uuid = null;
        }
        this.sessionUuid = window.sessionStorage && window.sessionStorage.getItem('uuid');
    }

    public isLogged = (): boolean  => {
        return !!this.token && this.sessionUuid === this.uuid;
    }

    public needSmsConfirm(): boolean {
        return this.currentUserValue.needSmsConfirm;
    }

    public passwordChangeRequired(): boolean {
        return this.currentUserValue.passwordReset;
    }

    public login = ({login, password}: ILoginRequest) => {
        this.dontRefreshToken = true;
        return this.http.post<ILoginResponse>(`${environment.url_api}/v1.0/users/login`, { login, password })
            .pipe(
                map((response: ILoginResponse) => {
                    const uuid = this.generateUuid();
                    const loginResponse =  this.manageLoginResponse(response, uuid);
                    this.startRefreshTokenInterval();
                    return loginResponse;
                }),
            );
    }

    public logout = () => {
        this.stopRefreshTokenInterval();
        return this.http.delete<any>(`${environment.url_api}/v1.0/users/logout`)
            .pipe(
                map(response => {
                    this.cleanUserData();
                    return response;
                }),
                catchError((error) => {
                    this.cleanUserData();
                    return of(error);
                }),
                first(),
            );
    }

    public sendSupplierLoginSms = () => {
        return this.http.post<any>(`${environment.url_api}/v1.0/sms/send`, {});
    }

    public confirmSupplierLoginSms = ({confirmationCode}) => {
        return this.http.post<any>(`${environment.url_api}/v1.0/sms/confirm`, {confirmationCode});
    }

    public refreshToken = () => {
        return this.http.post<any>(
            `${environment.url_api}/v1.0/users/refresh`,
            {
                    token: this.token,
            })
            .pipe(
                map((response: ILoginResponse) => {
                    return this.manageLoginResponse(response);
                }),
            );
    }

    public cleanUserData = () => {
        this.token = null;
        this.uuid = null;
        this.sessionUuid = null;
        if (window.sessionStorage) {
            window.sessionStorage.clear();
        }
        this.cookiesService.remove(this.cookieName);
        this.currentUserSubject$.next(null);
    }

    public manageLoginResponse = (response: ILoginResponse, uuid: string = this.uuid) => {
        if (response && response.token) {
            const jwtPayload = this.getJwtPayload(response.token);
            // if (jwtPayload.exp) {
            //     this.expiresTime = jwtPayload.exp * 1000;
            // }
            const user = {
                token: response.token,
                uuid: uuid,
            };
            if (window.sessionStorage) {
                window.sessionStorage.setItem('uuid', uuid);
            }
            this.cookiesService.setObject(this.cookieName, user, this.expiresTime);
            this.checkLogin();
            this.currentUserSubject$.next(jwtPayload);
        }
        return response;
    }

    public getToken = (): string => this.token;

    public getUuid = (): string => this.uuid;

    public logoutForced = () => {
        const state: IStateRouter = {
            refresh: true,
        };
        return this.router.navigate(
            [CONSTS.PATHS.LOGOUT],
            {state},
        );
    }

    private getJwtPayload = (token: string = null): IJwtPayload => {
        this.checkLogin();
        let jwtPayload: IJwtPayload = null;
        if (this.isLogged() || token) {
            token = token || this.token;
            try {
                const jwtHelper = new JwtHelperService();
                jwtPayload = jwtHelper.decodeToken(token);
                const { role } = jwtPayload;
                jwtPayload.supplier = role.indexOf(IUserRoles.PARC_SUPPLIER_P4R) !== -1;
                jwtPayload.needSmsConfirm = role.indexOf(IUserRoles.NEEDS_SMS_CONFIRMATION) !== -1;
            } catch (e) {
                this.token = null;
                this.cookiesService.remove(this.cookieName);
            }

        }
        return jwtPayload;
    }

    private generateUuid = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public homeRedirect = () => {
        if (!this.isLogged()) {
            this.router.navigate([CONSTS.PATHS.EMPTY]);
        } else if (this.currentUserValue.supplier) {
            this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER]);
        } else {
            this.router.navigate([ROUTES.ROUTER_DASHBOARD]);
        }
    }
}
