import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';
import {NavigationExtras, Router} from '@angular/router';

import * as CryptoJS from 'crypto-js';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
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
    tap,
} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { CookiesService } from './cookies.service';
import { environment } from 'src/environments/environment';
import { GTMService } from './gtm.service';
import {
    IJwtPayload,
    ILoginRequest,
    ILoginResponse,
    IUserRoles,
    IUserTypes,
} from './model/auth.model';
import { ILogoutRequired } from 'src/app/services/model/logout-required.model';
import { IStateRouter } from 'src/app/pages/public/logout/logout-page.model';
import { LANDING_PAGE } from 'src/common/graphql/models/user.model';
import { OnlyOneTabActiveService } from 'src/app/services/only-one-tab-active.service';
import { OnlyOneTabActiveState } from 'src/app/services/model/only-one-tab-active.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public currentUserSubject$: BehaviorSubject<IJwtPayload>;
    public currentUser$: Observable<IJwtPayload>;
    private token: string;

    public isLastRefreshToken = false;
    public startExpirationOfToken: Date = null;
    public dontRefreshToken = true;
    public wasRefreshCallRefreshInterval = false;
    private readonly startRefreshTokenIntervalSubject$ = new Subject<void>();
    private readonly stopRefreshTokenIntervalSubject$ = new Subject<void>();
    private readonly stopMessageInterval = 'STOP_INTERVAL';

    public loginExtras: NavigationExtras = {
        state: {
            afterLogin: true,
        },
    };

    get hashedUserId(): string {
        return this.hashUserId(this?.currentUserValue?.email);
    }

    public refreshTokenInterval$ =
        interval(CONSTS.REFRESH_TOKEN.INTERVAL)
            .pipe(
                switchMap((number) => {
                    this.isLastRefreshToken = false;
                    if (!this.wasRefreshCallRefreshInterval) {
                        if (!this.token) {
                            return of(this.stopMessageInterval);
                        }
                    }
                    return of(number);
                }),
                catchError(() => of(this.stopMessageInterval)),
                take(CONSTS.REFRESH_TOKEN.COUNT),
                tap(tick => {
                    this.isLastRefreshToken = CONSTS.REFRESH_TOKEN.COUNT - 1 === tick;
                    return tick;
                }),
                takeUntil(this.stopRefreshTokenIntervalSubject$),
                repeatWhen(() => this.startRefreshTokenIntervalSubject$),
                filter((num) => {
                    if (num === this.stopMessageInterval || !this.onlyOneTabActiveService.isThisTabActive()) {
                        this.stopRefreshTokenInterval();
                        return false;
                    }
                    return true;
                }),
                switchMap(() => this.refreshToken()),
            );

    constructor(
        private cookiesService: CookiesService,
        private gtmService: GTMService,
        private http: HttpClient,
        private onlyOneTabActiveService: OnlyOneTabActiveService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        const jwtPayload = this.getJwtPayload();
        this.currentUserSubject$ = new BehaviorSubject<IJwtPayload>(jwtPayload);
        this.currentUser$ = this.currentUserSubject$.asObservable();
        if (isPlatformBrowser(this.platformId)) {
            this.refreshTokenInterval$.subscribe();

            this.currentUserSubject$.subscribe( (jwtPayloadSubjectSubject: IJwtPayload) => {
                this.gtmService.setUserId(this.hashUserId(jwtPayloadSubjectSubject?.email));
            });
        }
    }

    static jwtTokenHasRoles(jwtToken: string, accessRole: string[]): boolean {
        const jwtHelper = new JwtHelperService();
        const jwtPayload = jwtHelper.decodeToken(jwtToken);
        const { role } = jwtPayload;
        return R_.containsAny(role, accessRole);
    }

    public hashUserId = (id: string): string => (id ? CryptoJS.SHA3(id).toString() : null);

    public refreshTokenInterval = () => {
        this.startRefreshTokenInterval();
        return this.refreshToken()
            .pipe(
                catchError(() => of()),
                tap(() => {
                    this.startExpirationOfToken = new Date();
                }),
            );
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
        if (this.cookiesService.has(CONSTS.STORAGE_HELPERS.USER)) {
            this.token = (<any>this.cookiesService.getObject(CONSTS.STORAGE_HELPERS.USER)).token;
        } else {
            this.token = null;
        }
    }

    public isLogged = (): boolean  => {
        return !!this.token;
    }

    public needSmsConfirm(): boolean {
        return this.currentUserValue?.needSmsConfirm;
    }

    public passwordChangeRequired(): boolean {
        return this.currentUserValue?.passwordReset;
    }

    public login = ({login, password}: ILoginRequest) => {
        this.dontRefreshToken = true;
        this.wasRefreshCallRefreshInterval = true;
        return this.http.post<ILoginResponse>(`${environment.url_api}/v1.0/users/login`, { login, password })
            .pipe(
                map((response: ILoginResponse) => {
                    const loginResponse =  this.manageLoginResponse(response);
                    this.startRefreshTokenInterval();
                    this.startExpirationOfToken = new Date();
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
                    this.onlyOneTabActiveService.setActiveTab(OnlyOneTabActiveState.LOGOUT);
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
        if (window.sessionStorage) {
            window.sessionStorage.clear();
        }
        this.cookiesService.remove(CONSTS.STORAGE_HELPERS.USER);
        this.currentUserSubject$.next(null);
    }

    public setActualStateFromOtherTab = () => {
        if (isPlatformBrowser(this.platformId)) {
            const token = this.cookiesService.get(CONSTS.STORAGE_HELPERS.USER);
            if (token) {
                const jwtPayload = this.getJwtPayload(token);
                this.currentUserSubject$.next(jwtPayload);
            }
        }
    }

    public manageLoginResponse = (response: ILoginResponse) => {
        if (response && response.token) {
            const jwtPayload = this.getJwtPayload(response.token);
            const user = {
                token: response.token,
            };
            const expiration = new Date().getTime() + CONSTS.DEFAULT_EXPIRATION;
            this.cookiesService.setObject(CONSTS.STORAGE_HELPERS.USER, user, expiration);
            this.checkLogin();
            this.currentUserSubject$.next(jwtPayload);
        }
        return response;
    }

    public getToken = (): string => this.token;

    public logoutForced = (isFromUnauthorized = true) => {
        const state: IStateRouter = {
            refresh: true,
            isFromUnauthorized,
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
                jwtPayload.type = this.getUserType(role);
                jwtPayload.needSmsConfirm = role.indexOf(IUserRoles.NEEDS_SMS_CONFIRMATION) !== -1;
            } catch (e) {
                this.token = null;
                this.cookiesService.remove(CONSTS.STORAGE_HELPERS.USER);
            }

        }
        return jwtPayload;
    }

    private getUserType = (roles: string[]): IUserTypes => R.cond([
        [(rolesParam) => R.indexOf(IUserRoles.ROLE_CONTRACT_IMPORTER)(roles) !== -1, R.always(IUserTypes.CONTRACT_IMPORTER)],
        [(rolesParam) => R.indexOf(IUserRoles.PARC_SUPPLIER_P4R)(roles) !== -1, R.always(IUserTypes.SUPPLIER)],
        [(rolesParam) => R.indexOf(IUserRoles.PARC_CONSUMER_P_4_R)(roles) !== -1, R.always(IUserTypes.CONSUMER)],
        [R.T, R.always(IUserTypes.CONSUMER)],
    ])(roles)

    public getAuthorizationHeaders = (contentType: string = null, accept: string = '*/*'): HttpHeaders => {
        const token = this.getToken();
        return new HttpHeaders({
            ...(!!token) && {Authorization: `Bearer ${token}`},
            ...(!!contentType) && {'Content-Type': contentType},
            'X-API-Key': `${environment.x_api_key}`,
            accept,
        });
    }

    public isCurrentUser = (userType: IUserTypes) => this.currentUserValue && this.currentUserValue.type === userType;

    public homeRedirect = (forceRedirectToLastUrl = false, logoutRequired: ILogoutRequired = null) => {
        if (forceRedirectToLastUrl) {
            const lastUrl = localStorage.getItem(CONSTS.STORAGE_HELPERS.LAST_URL);
            if (lastUrl) {
                window.open(lastUrl, '_self');
                return;
            }
        }

        if (!this.isLogged()) {
            this.router.navigate([CONSTS.PATHS.EMPTY]);
        } else if (this.isCurrentUser(IUserTypes.SUPPLIER)) {
            this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER_POWER], {
                state: {
                    logoutRequired,
                },
            });
        } else if (this.isCurrentUser(IUserTypes.CONTRACT_IMPORTER)) {
            this.router.navigate([ROUTES.ROUTER_ASK_FOR_OFFER_NEW], {
                state: {
                    logoutRequired,
                },
            });
        } else {
            this.router.navigate([ROUTES.ROUTER_DASHBOARD], {
                state: {
                    logoutRequired,
                },
            });
        }
    }

    public routerAfterLogin = ({landingPage}) => {
        switch (landingPage) {
            case LANDING_PAGE.DASHBOARD:
                return ROUTES.ROUTER_DASHBOARD;
            case LANDING_PAGE.NEW_SUPPLY_POINT:
                return ROUTES.ROUTER_REQUEST_SIGNBOARD;
            case LANDING_PAGE.OFFERS:
                return ROUTES.ROUTER_SUPPLY_OFFER_POWER;
            case LANDING_PAGE.WAITING_FOR_PAYMENT:
                return ROUTES.ROUTER_REQUEST_PAYMENT;
            case LANDING_PAGE.CONTRACT_IMPORT:
                return ROUTES.ROUTER_ASK_FOR_OFFER_NEW;
        }
    }
}
