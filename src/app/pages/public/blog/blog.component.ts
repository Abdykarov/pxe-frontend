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
    public readonly blog: IBlog = this.route.snapshot.data.blog;
    public readonly activeType$: Observable<IType> = this.blogFacade.activeType$;
    public readonly breadcrumb$: Observable<IBreadcrumbItems> = this.blogFacade.breadcrumb$;

    constructor(
        public blogFacade: BlogFacade,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.blogFacade.blogSubject$.next(this.blog);

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
