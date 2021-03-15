import { ActivatedRoute } from '@angular/router';
import {
    Component,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import { Observable } from 'rxjs';

import { BlogService } from './blog.service';
import {IBlog, IType} from 'src/common/cms/models/blog';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { ISeo } from 'src/common/cms/models/seo';

@Component({
    selector: 'pxe-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
    public readonly blog: IBlog = this.route.snapshot.data.blog;
    public readonly activeTag$: Observable<string>;
    public readonly blogTypes: IType[];
    public breadcrumb: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: '',
        },
    ];

    constructor(
        public blogService: BlogService,
        private route: ActivatedRoute,
        private metaService: Meta,
        private titleService: Title,
    ) {
        this.blogTypes = this.blogService.getTypes(this.blog);
        const seo: ISeo = R.head(this.blog.seo);
        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
        });
        this.activeTag$ = this.blogService.getActiveTag$(route.firstChild);
    }
}
