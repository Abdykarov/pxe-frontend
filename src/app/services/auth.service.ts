import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs/internal/observable/of';
import {
    map,
} from 'rxjs/operators';

import { CookiesService } from './cookies.service';
import { environment } from 'src/environments/environment';

import {
    ILoginRequest,
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
        this.cookiesService.set('user', JSON.stringify({token: 'xxx'}), 5645454545);
        this.checkLogin();
        // TODO - temporary solution, will be replaced with gql call
        return of(true);
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
