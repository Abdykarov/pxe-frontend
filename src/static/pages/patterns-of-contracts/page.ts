import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})

export class PatternsOfContractsPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public urlPdfPatterOfContracts = '/assets/pdfs/static/contract-power-fo.pdf';

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Domů',
                url: '/full/patterns-of-contracts',
            },
            {
                label: 'Vzory smluv o dodávce',
                url: null,
            },
        ];
    }

    public routerTo = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    }
}
