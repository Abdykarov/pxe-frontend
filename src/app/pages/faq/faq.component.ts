import {
    Component,
} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

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
    public faq: IFaq = this.route.snapshot.data.faq;

    public breadcrumbItemsSimple: IBreadcrumbItems = [
        {
            label: 'Domů',
            url: '/',
        },
        // {
        //     label: this.faq.breadcrumbTitle,
        // },
    ];

    constructor(
        private route: ActivatedRoute,
        protected router: Router,
    ) {
        super();
        console.log('faq.component.ts');
        console.log(this.faq);
        console.log(this.route);
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.faq = this.route.snapshot.data.faq;
                    const isDetail = (event.urlAfterRedirects.match(/\//g) || []).length === this.NUMBER_OF_SLASH_IN_DETAIL_IN_URL;
                    if (isDetail) {
                        this.breadcrumbItemsSimple[1].url = `/${CONSTS.PATHS.FAQ}`;
                    } else {
                        this.breadcrumbItemsSimple[1].url = ``;
                    }
                }
            });
    }
}
