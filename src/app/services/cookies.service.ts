import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CookiesService {

    get = (name: string) => {
        name = name + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return '';
    }

    set = (name: string, value: string, expires: number) => {
        const d = new Date();
        d.setTime(d.getTime() + (expires * 24 * 60 * 60 * 1000));
        const expiresIn = 'expires=' + d.toUTCString();
        document.cookie = name + '=' + value + ';' + expiresIn + ';path=/';
    }

    has = (name: string): boolean => !!this.get(name);

    remove = (name: string) => {
        document.cookie = name + '=; expires=' + new Date().toUTCString() + ';path=/';
    }
}
