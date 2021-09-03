import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CONSTS } from 'src/app/app.constants';
import { BlogService } from 'src/common/cms/services/blog.service';
import { IArticlesWithTotals } from 'src/common/cms/models/blog';

@Injectable({
    providedIn: 'root',
})
export class ArticlesResolver implements Resolve<any> {

    constructor(
        private blogService: BlogService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticlesWithTotals> {
        const { path }  = route.firstChild.firstChild.url[0];
        return this.blogService.getArticles(0, path !== CONSTS.ALL_BLOG ? path : undefined );
    }
}
