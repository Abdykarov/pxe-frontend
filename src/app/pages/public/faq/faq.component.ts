import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import * as R from 'ramda';
import { combineLatest } from 'rxjs';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractFaqComponent } from './abstract-faq.component';
import { CONSTS } from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IFaq } from 'src/common/cms/models/faq';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FaqComponent extends AbstractFaqComponent {
    private readonly NUMBER_OF_SLASH_IN_DETAIL_IN_URL = 3;
    public readonly faqSource: IFaq[] = this.route.snapshot.data.faq;
    public faq: IFaq = null;

    public breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        {
            label: '',
        },
    ];

    constructor(
        private cd: ChangeDetectorRef,
        public route: ActivatedRoute,
        public faqService: FaqService,
        protected router: Router,
    ) {
        super(
            faqService,
            route,
        );

        combineLatest([this.router.events, this.loadConfigs$])
            .pipe(
                takeUntil(this.destroy$),
                filter(([event, _]) => event instanceof NavigationEnd),
            )
            .subscribe(([event, _]) => {
                const activeTag: string = this.getActiveTag();

                if (!activeTag) {
                    const firstTag = this.faqConfig[0].url;
                    this.router.navigate(['/', CONSTS.PATHS.FAQ, firstTag]);
                    return;
                }

                this.faq = this.getFaqByTagType(activeTag)(this.faqSource);
                this.breadcrumbItemsSimple[1].label = this.faq.breadcrumbTitle;

                const isDetail =
                    ((<NavigationEnd>event).urlAfterRedirects.match(/\//g) || []).length === this.NUMBER_OF_SLASH_IN_DETAIL_IN_URL;
                if (isDetail) {
                    this.breadcrumbItemsSimple[1].url = `/${CONSTS.PATHS.FAQ}`;
                } else {
                    this.breadcrumbItemsSimple[1].url = ``;
                }
                this.cd.markForCheck();
            });
    }

    private getFaqByTagType = (tagType: string) => R.find(
        R.pipe(
            R.prop('tag'),
            R.head,
            R.propEq('type', tagType),
        ),
    )

    private getActiveTag = (): string => <string>this.route.firstChild.snapshot?.params?.tag;
}
