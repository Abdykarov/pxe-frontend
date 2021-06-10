import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

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
        return this.blogService.getArticles();
    }
}
