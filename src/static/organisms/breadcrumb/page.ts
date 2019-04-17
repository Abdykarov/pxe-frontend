import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class BreadcrumbPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public breadcrumbItemsMultiple0: IBreadcrumbItems;
    public breadcrumbItemsMultiple1: IBreadcrumbItems;
    public breadcrumbItemsMultiple2: IBreadcrumbItems;
    private body = document.getElementById('top');

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Breadcrumb',
                url: null,
            },
        ];

        this.breadcrumbItemsMultiple0 = [
            {
                label: 'Homepage',
                url: '',
            },
        ];

        this.breadcrumbItemsMultiple1 = [
            {
                label: 'Homepage',
                url: '/',
            },
            {
                label: 'Last item',
                url: '',
            },
        ];

        this.breadcrumbItemsMultiple2 = [
            {
                label: 'Homepage',
                url: '/',
            },
            {
                label: 'Buttons',
                url: '/basic/buttons',
            },
            {
                label: 'Last item',
                url: '',
            },
        ];
    }
}
