import { Component } from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { BlogFacade } from 'src/app/pages/public/blog/blog.facade';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { IArticle } from 'src/common/cms/models/blog';
import { ICardData } from 'src/common/ui/card/models/data.model';

@Component({
    selector: 'lnd-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends AbstractComponent {
    public activeArticle$: Observable<IArticle> = this.blogFacade.activeArticle$;
    public otherArticles$: Observable<ICardData[]>;

    public otherArticles: IArticle[];

    constructor(
        private blogFacade: BlogFacade,
        private blogService: BlogService,
        private router: Router,
    ) {
        super();
        this.otherArticles$ = this.blogFacade.activeArticles$
            .pipe(
                map(this.blogService.getOtherArticles(this.blogFacade.activeArticleSubject$.getValue())),
                map(R.map( this.blogService.articleToCardData)),
                map(R.map( this.blogService.toShortContent)),
            );
    }

    public showAllArticle(evt): void {
        evt.preventDefault();
        this.router.navigate([this.ROUTES.ROUTER_BLOG, 'all']);
    }

    public showDetail(data, activeTag): void {
        this.router.navigate([this.ROUTES.ROUTER_BLOG, activeTag, data.id]);
    }

}
