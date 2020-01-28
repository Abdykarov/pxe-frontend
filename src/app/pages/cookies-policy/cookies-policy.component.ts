import { Component } from '@angular/core';
import { CONSTS } from 'src/app/app.constants';
import { Title } from '@angular/platform-browser';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-cookies-policy',
    templateUrl: './cookies-policy.component.html',
    styleUrls: ['./cookies-policy.component.scss'],
})
export class CookiesPolicyComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle(CONSTS.TITLES.COOKIES_POLICY);
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/',
            },
            {
                label: 'Cookies policy',
            },
        ];
    }
}
