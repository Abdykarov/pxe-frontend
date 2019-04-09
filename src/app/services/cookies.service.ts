import { Injectable } from '@angular/core';
import {
    CookieOptions,
    CookieService,
} from 'ngx-cookie';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {

    constructor(private cookieService: CookieService) {}

    get = (name: string) => this.cookieService.get(name);

    set = (name: string, value: string, expires: number) => {
        const d = new Date();
        d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
        const options: CookieOptions = {
            expires: d.toUTCString(),
            path: '/',
        };
        this.cookieService.put(name, value, options);
    }

    has = (name: string): boolean => !!this.get(name);

    remove = (name: string) => this.cookieService.remove(name);
}
