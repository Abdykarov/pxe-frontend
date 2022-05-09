import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CONSTS } from 'src/app/app.constants';
import { IArticlesWithTotals } from 'src/common/cms/models/blog';
import { BlogService } from 'src/common/cms/services/blog.service';

@Injectable({
    providedIn: 'root',
})
export class ArticlesResolver implements Resolve<any> {
    constructor(private blogService: BlogService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IArticlesWithTotals> {
        const { path: type } = route.firstChild.firstChild.url[0] || {};
        const { path: article } = route.firstChild.firstChild.url[1] || {};
        return this.blogService.getArticles(
            0,
            type !== CONSTS.ALL_BLOG ? type : undefined,
            null,
            article ? article : undefined,
            article ? null : CONSTS.ARTICLE_PAGE_SIZE
        );
    }
}
