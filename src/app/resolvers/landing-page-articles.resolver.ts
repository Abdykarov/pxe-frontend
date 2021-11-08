import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { IArticle } from 'src/common/cms/models/blog';
import { BlogService as BlogServiceCms } from 'src/common/cms/services/blog.service';

@Injectable({
    providedIn: 'root',
})
export class LandingPageArticlesResolver implements Resolve<any> {
    constructor(
        private blogServiceCms: BlogServiceCms,
        private blogService: BlogService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IArticle[]> {
        return this.blogServiceCms
            .getLpArticles()
            .pipe(
                map(R.map(this.blogService.articleToCardData)),
                map(R.map(this.blogService.toShortContent))
            );
    }
}
