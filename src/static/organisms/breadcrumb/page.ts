import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class BreadcrumbPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public breadcrumbItemsMultiple: IBreadcrumbItems;
    private body = document.getElementById('top');

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Breadcrumbs',
                url: null,
            },
        ];

        this.breadcrumbItemsMultiple = [
            {
                label: 'Buttons',
                url: '/buttons',
            },
            {
                label: 'Last item',
                url: '',
            },
        ];
    }
}
