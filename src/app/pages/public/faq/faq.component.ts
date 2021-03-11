import {
    Component,
} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';

import * as R from 'ramda';
import { takeUntil} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IFaq } from 'src/common/cms/models/faq';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FaqComponent extends AbstractComponent {
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
        private route: ActivatedRoute,
        protected router: Router,
    ) {
        super();

        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    const activeTag: string = <string>this.route.firstChild.snapshot.params?.tag;
                    if (!activeTag) {
                        this.router.navigate(['/', CONSTS.PATHS.FAQ, R.head(R.head(this.faqSource).tag).url]);
                        return;
                    }
                    this.faq = this.getFaqByTagType(activeTag)(this.faqSource);
                    this.breadcrumbItemsSimple[1].label = this.faq.breadcrumbTitle;

                    const isDetail = (event.urlAfterRedirects.match(/\//g) || []).length === this.NUMBER_OF_SLASH_IN_DETAIL_IN_URL;
                    if (isDetail) {
                        this.breadcrumbItemsSimple[1].url = `/${CONSTS.PATHS.FAQ}`;
                    } else {
                        this.breadcrumbItemsSimple[1].url = ``;
                    }
                }
            });
    }

    private getFaqByTagType = (tagType: string) => R.find(
        R.pipe(
            R.prop('tag'),
            R.head,
            R.propEq('type', tagType),
        ),
    )

}
