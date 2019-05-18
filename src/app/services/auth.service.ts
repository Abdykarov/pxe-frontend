import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';

import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CookiesService } from './cookies.service';
import {
    IJwtPayload,
    ILoginRequest,
    ILoginResponse,
    IUserRoles,
} from './model/auth.model';
import { environment } from 'src/environments/environment';
import {
    getEmail,
    getUserDetail,
} from 'src/common/graphql/queries/user';
import { userLogin } from 'src/common/graphql/mutation/user';
import { parseEmailFromUsername } from 'src/common/utils';
import { AbstractComponent } from '../../common/abstract.component';
import { AuthApolloService } from './auth-apollo.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private token: string;
    private cookieName = 'user';
    private expiresTime = 3600;

    constructor(
        // private apollo: Apollo,
        // private authApolloService: AuthApolloService,
        private cookiesService: CookiesService,
        private http: HttpClient,
    ) {
        // super();
        console.log('%c ***** INIT *****', 'background: #bada55; color: #000; font-weight: bold', this.getJwtPayload());
        // this.apollo.getClient().writeData({
        //     // query: getUserDetail,
        //     data: {
        //         user: {
        //             __typename: 'User',
        //             userPayload: {
        //                 data: 'xxx',
        //                 __typename: 'UserPayload',
        //             },
        //         },
        //     },
        // });

        // this.apollo.getClient().writeQuery({
        //     query: getUserDetail,
        //     data: {
        //         userPayload: this.getJwtPayload(),
        //     },
        // });

        // this.userLogin()
        //     // .pipe(takeUntil(this.destroy$))
        //     .subscribe(res => {
        //     console.log('%c ***** res *****', 'background: #bada55; color: #000; font-weight: bold', res);
        //     // console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', this.getUserDetail());
        // });
    }

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
        console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', this.getJwtPayload());

        // this.apollo.getClient().writeQuery({
        //     query: getUserDetail,
        //     data: {
        //         userPayload: this.getJwtPayload(),
        //     },
        // });

        // this.userLogin().pipe(takeUntil(this.destroy$)).subscribe(res => {
        //     console.log('%c ***** res *****', 'background: #bada55; color: #000; font-weight: bold', res);
        //     console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', this.getUserDetail());
        // });


        // return;
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
                        // this.apollo.getClient().writeQuery({
                        //     query: getUserDetail,
                        //     data: {
                        //         userPayload: this.getJwtPayload(),
                        //     },
                        // });
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

    // isSupplier(): boolean {
    //     const userDetail = this.getUserDetail();
    //     console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', userDetail);
    //     return !userDetail || (userDetail.role === IUserRoles.PARC_SUPPLIER_P4R);
    // }

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

    // public userLogin() {
    //     return this.apollo
    //         .mutate({
    //             mutation: userLogin,
    //             variables: {
    //                 // userPayload: this.getJwtPayload(),
    //                 userPayload: {
    //                     data: 'xxx2',
    //                     __typename: 'UserPayload',
    //                 },
    //             },
    //         });
    // }
    //
    // getUserEmail = (): string => {
    //     return this.getAttribute('email');
    // }
    //
    //  getUserDetail(): IJwtPayload {
    //      try {
    //          return this.apollo.getClient().readQuery({
    //              query: getUserDetail,
    //          }).user.userPayload;
    //      } catch (e) {
    //          console.log('%c ***** e *****', 'background: #bada55; color: #000; font-weight: bold', e);
    //          return null;
    //      }
    // }
    //
    // getAttribute(attribute: string): any {
    //     const userDetail: IJwtPayload = this.getUserDetail();
    //     if (!userDetail || !userDetail[attribute]) {
    //         return null;
    //     }
    //
    //     return userDetail[attribute];
    // }

    parseJwt = (): IJwtPayload => {
        const jwtHelper = new JwtHelperService();
        return jwtHelper.decodeToken(this.token);
    }

    getJwtPayload = (): IJwtPayload => {
        this.checkLogin();
        const jwtPayload = this.parseJwt();
        const { username } = jwtPayload;
        jwtPayload.email = parseEmailFromUsername(username);
        jwtPayload.__typename = 'UserPayload';
        return jwtPayload;
    }
}

