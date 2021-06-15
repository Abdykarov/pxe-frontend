import { Component } from '@angular/core';
import { Router} from '@angular/router';

import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { BlogFacade } from 'src/app/pages/public/blog/blog.facade';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { ICardData } from 'src/common/ui/card/models/data.model';
import { IType } from 'src/common/cms/models/blog';

@Component({
    selector: 'pxe-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent extends AbstractComponent {
    public readonly blogTypes$: Observable<IType[]> = this.blogFacade.blogTypes$;
    public readonly activeTag$: Observable<IType>  = this.blogFacade.activeType$;
    public readonly activeArticles$: Observable<ICardData[]>;
    public readonly totalItems$: Observable<number> = this.blogFacade.totalItems$;

    constructor(
        public blogFacade: BlogFacade,
        public blogService: BlogService,
        private router: Router,
    ) {
        super();
        this.activeArticles$ = this.blogFacade.activeArticles$.pipe(
            map(R.map(this.blogService.articleToCardData)),
            map(R.map(this.blogService.toShortContent)),
        );
    }

    public changeArticleType(evt, url: string): void {
        evt.preventDefault();
        this.router.navigate([this.ROUTES.ROUTER_BLOG, url]);
    }
}
