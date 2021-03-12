import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import {
    Observable,
    of,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BlogResolver implements Resolve<any> {

    constructor() {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return of({});
    }
}
