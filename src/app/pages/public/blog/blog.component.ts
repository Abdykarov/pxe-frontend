import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import {
    Component,
    OnDestroy,
} from '@angular/core';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { BlogFacade } from './blog.facade';
import {
    IArticlesWithTotals,
    IBlog,
    IType,
} from 'src/common/cms/models/blog';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IRouterParams } from './blog.model';

@Component({
    selector: 'pxe-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
})
export class BlogComponent extends AbstractComponent implements OnDestroy {
    public readonly types: IType[] = this.route.snapshot.data.types;
    public readonly articlesWithTotal: IArticlesWithTotals = this.route.snapshot.data.articlesWithTotal;
    public readonly activeType$: Observable<IType> = this.blogFacade.activeType$;
    public readonly breadcrumb$: Observable<IBreadcrumbItems> = this.blogFacade.breadcrumb$;
    public readonly isDetail$: Observable<boolean> = this.blogFacade.isDetailSubject$;

    constructor(
        public blogFacade: BlogFacade,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();

        const {
            items,
            total,
        } = this.articlesWithTotal;

        const blog: IBlog = {
            types: this.types,
            articles: items,
            total: total,
        };

        this.blogFacade.blogSubject$.next(blog);
        router.events
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((val) => {
                if (val instanceof NavigationEnd) {
                    this.blogFacade.routerParamsSubject$.next(<IRouterParams>this.route.firstChild.snapshot.params);
                }
            });
    }

    ngOnDestroy(): void {
        this.blogFacade.blogSubject$.next(null);
    }
}
