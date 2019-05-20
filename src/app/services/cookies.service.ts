import { Injectable } from '@angular/core';
import {
    CookieOptions,
    CookieService,
} from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {

    constructor(
        private cookieService: CookieService,
    ) {}

    get = (name: string) => this.cookieService.get(name);
    set = (name: string, value: string, expires: number) => {
        const options = this.createCookieOptions(expires);
        this.cookieService.put(name, value, options);
    }

    getObject = (name: string) => this.cookieService.getObject(name);

    setObject = (name: string, value: any, expires: number) => {
        const options = this.createCookieOptions(expires);
        this.cookieService.putObject(name, value, options);
    }

    has = (name: string): boolean => !!this.get(name);

    remove = (name: string) => this.cookieService.remove(name);

    private createCookieOptions = (expires: number) => {
        const d = new Date();
        d.setTime(expires);
        const options: CookieOptions = {
            expires: d.toUTCString(),
            path: '/',
        };
        return options;
    }
}
