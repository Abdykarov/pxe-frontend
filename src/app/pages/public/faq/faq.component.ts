import {
    Component,
} from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-patterns-of-contracts',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
})
export class FaqComponent extends AbstractComponent {
    private readonly NUMBER_OF_SLASH_IN_DETAIL_IN_URL = 3;
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
        protected router: Router,
    ) {
        super();
        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
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
