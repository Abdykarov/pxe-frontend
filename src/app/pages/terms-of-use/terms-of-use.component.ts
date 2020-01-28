import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CONSTS } from 'src/app/app.constants';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-term-of-use',
    templateUrl: './terms-of-use.component.html',
    styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle(CONSTS.TITLES.TERMS_OF_USE);
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: 'Podmínky užívání',
            },
        ];
    }
}
