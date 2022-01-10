import { Component, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { IS_PRERENDER_PROVIDER } from 'src/app/app.constants';
import { BlogFacade } from 'src/app/pages/public/blog/blog.facade';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { IType } from 'src/common/cms/models/blog';
import { ICardData } from 'src/common/ui/card/models/data.model';

@Component({
    selector: 'pxe-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent extends AbstractComponent {
    public readonly blogTypes$: Observable<IType[]> =
        this.blogFacade.blogTypes$;
    public readonly activeTag$: Observable<IType> = this.blogFacade.activeType$;
    public readonly activeArticles$: Observable<ICardData[]>;
    public readonly totalItems$: Observable<number> =
        this.blogFacade.totalItems$;
    public readonly Math = Math;

    constructor(
        public blogFacade: BlogFacade,
        public blogService: BlogService,
        private router: Router,
        @Optional() @Inject(IS_PRERENDER_PROVIDER) private isPrerender: boolean
    ) {
        super();
        this.activeArticles$ = this.blogFacade.activeArticles$.pipe(
            map(R.map(this.blogService.articleToCardData)),
            map(R.map(this.blogService.toShortContent))
        );

        if (this.isPrerender) {
            setTimeout(() => {
                combineLatest([this.totalItems$, this.activeArticles$])
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(([totalItems, articles]) => {
                        if (totalItems > articles.length) {
                            let currentLength = this.CONSTS.ARTICLE_PAGE_SIZE;
                            while (currentLength < totalItems) {
                                const page =
                                    currentLength /
                                        this.CONSTS.ARTICLE_PAGE_SIZE +
                                    1;
                                this.blogFacade.fetchMoreArticles(page);
                                currentLength += this.CONSTS.ARTICLE_PAGE_SIZE;
                            }
                        }
                    });
            });
        }
    }

    public changeArticleType(evt, url: string): void {
        evt.preventDefault();
        this.router.navigate([this.ROUTES.ROUTER_BLOG, url]);
    }
}
