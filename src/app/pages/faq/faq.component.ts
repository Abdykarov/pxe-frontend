import {
    ChangeDetectorRef,
    Component, OnInit,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { CONSTS, SEO } from 'src/app/app.constants';
import { AbstractComponent } from 'src/common/abstract.component';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IQuestion, ITagConfigItem, Tag, tagConfig, questions } from 'src/config';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FaqComponent extends AbstractComponent implements OnInit {
    public activeTag = null;
    public tagConfig = tagConfig;
    public questions: IQuestion[] = null;
    public breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: 'Často kladené otázky',
        },
    ];

    constructor(
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) {
        super();
        this.titleService.setTitle(CONSTS.TITLES.FAQ);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.FAQ,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.FAQ,
            ].toString(),
        });
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.activeTag = params.tag;
                this.questions = R.filter((tag: IQuestion) => tag.tag === this.activeTag, questions);
                this.cd.markForCheck();
            });
    }

    public changeTag = (evt, urlTag: string) => {
        evt.preventDefault();
        this.router.navigate([`${CONSTS.PATHS.FAQ }/${urlTag}`]);
    }
}
