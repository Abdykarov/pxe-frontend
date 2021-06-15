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
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { BlogFacade } from './blog.facade';
import {
    IArticlesWithTotals,
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

        this.blogFacade.blogTypesSubject$.next(this.types);

        router.events
            .pipe(
                takeUntil(this.destroy$),
                filter(val => val instanceof NavigationEnd),
            )
            .subscribe((_) => {
                this.blogFacade.typeChange(<IRouterParams>this.route.firstChild.snapshot.params);
            });
    }

    ngOnDestroy(): void {
        this.blogFacade.blogSubject$.next(null);
    }
}
