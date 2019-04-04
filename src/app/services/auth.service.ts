import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
    map,
} from 'rxjs/operators';

import { CookiesService } from './cookies.service';
import { environment } from 'src/environments/environment';

import {
    ILoginRequest,
    ILoginResponse,
} from './model/auth.model';

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
            this.token = this.cookiesService.get(this.cookieName).token;
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
                        const user =  JSON.stringify({token: response.token});
                        this.cookiesService.set(this.cookieName, user, this.expiresTime);
                    }
                    return response;
                }),
            );
    }

    logout = () => {
        return this.http.delete<any>(`${environment.api}/api/user/logout`)
            .pipe(
                map(response => {
                    this.token = null;
                    this.cookiesService.remove(this.cookieName);
                    return response;
                }),
            );
    }

    getToken = (): string => this.token;
}
