import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BlogService } from 'src/common/cms/services/blog.service';

@Injectable({
    providedIn: 'root',
})
export class BlogResolver implements Resolve<any> {

    constructor(
        private blogService: BlogService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.blogService.getBlog();
    }
}
