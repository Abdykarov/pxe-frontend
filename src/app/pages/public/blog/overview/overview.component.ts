import {ActivatedRoute, Router} from '@angular/router';
import {
    Component,
    OnInit,
} from '@angular/core';

import { Observable } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { BlogComponent } from 'src/app/pages/public/blog/blog.component';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import {
    IBlog,
    IType,
} from 'src/common/cms/models/blog';

@Component({
    selector: 'lnd-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent extends AbstractComponent {
    public readonly blog: IBlog;
    public readonly blogTypes = this.blogComponent.blogTypes;
    public readonly activeTag$: Observable<string>;

    constructor(
        private blogComponent: BlogComponent,
        public blogService: BlogService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.blog = blogComponent.blog;
        this.activeTag$ = this.blogService.getActiveTag$(route);
    }

    changeArticleType(evt, url: string): void {
        evt.preventDefault();
        this.router.navigate([this.ROUTES.ROUTER_BLOG, url]);
    }

}
