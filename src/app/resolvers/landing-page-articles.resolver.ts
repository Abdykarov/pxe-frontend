import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { BlogService as BlogServiceCms } from 'src/common/cms/services/blog.service';
import { IArticle } from 'src/common/cms/models/blog';

@Injectable({
    providedIn: 'root',
})
export class LandingPageArticlesResolver implements Resolve<any> {

    constructor(
        private blogServiceCms: BlogServiceCms,
        private blogService: BlogService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticle[]> {
        return this.blogServiceCms.getLpArticles()
            .pipe(
                map(R.map(this.blogService.articleToCardData)),
                map(R.map(this.blogService.toShortContent)),
            );
    }
}
