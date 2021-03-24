import {ChangeDetectorRef, Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import * as R from 'ramda';
import {map, takeUntil} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { BlogFacade } from 'src/app/pages/public/blog/blog.facade';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import {
    IArticle,
    IType,
} from 'src/common/cms/models/blog';
import { ICardData } from 'src/common/ui/card/models/data.model';

@Component({
    selector: 'pxe-blog-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent extends AbstractComponent {
    public readonly activeArticle$: Observable<IArticle> = this.blogFacade.activeArticle$;
    public readonly activeType$: Observable<IType>  = this.blogFacade.activeType$;
    public otherArticles$: Observable<ICardData[]>;

    public otherArticles: IArticle[];

    constructor(
        private blogFacade: BlogFacade,
        private blogService: BlogService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();

        router.events
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((val) => {
                if (val instanceof NavigationEnd) {
                    this.otherArticles$ = this.blogFacade.activeArticles$
                        .pipe(
                            map(this.blogService.getOtherArticles(this.blogFacade.activeArticleSubject$.getValue())),
                            map(R.map(this.blogService.articleToCardData)),
                            map(R.map(this.blogService.toShortContent)),
                        );
                    this.cd.markForCheck();
                }
            });
    }

    public showAllArticle(evt): void {
        evt.preventDefault();
        this.router.navigate([this.ROUTES.ROUTER_BLOG, 'all']);
    }
}
