import { Component } from '@angular/core';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    rows,
    tableConfig,
} from 'src/static/pages/patterns-of-contracts/config';

@Component({
    templateUrl: './page.html',
})
export class PatternsOfContractsPageComponent {
    public bannerObj: IBannerObj = {
        linkValue: 'full/patterns-of-contracts',
        text: '1.7.9020 začíná platnost nové smlouvy o sdružených službách dodávky elektřiny pro domácnosti',
    };
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public urlPdfPatterOfContracts =
        '/assets/pdfs/patterns-of-contracts/contract-power-fo.pdf';
    public downloadFileName = 'Vzorová smlouva domácnost - elektřina';
    public tableConfig = tableConfig;
    public rows = rows;

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

    public click = (evt) => {
        evt.preventDefault();
        console.log('CLICK');
    };
}
