import { formatDate } from '@angular/common';
import {
    Inject,
    Injectable,
    LOCALE_ID,
} from '@angular/core';

import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';

// tslint:disable:max-line-length
@Injectable({
    providedIn: 'root',
})
export class SupplierConcludedContractsConfig {

    constructor(
        @Inject(LOCALE_ID) private locale: string,
    ) {}

    public getTableCols = (commodityType: CommodityType) => ([
        {
            label: 'Jméno a příjmení',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: ISupplyPoint) => `${row.name}`,
                },
            ],
        },
        {
            label: commodityType === CommodityType.POWER ? 'EAN' : 'EIC',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: ISupplyPoint) => `${row.ean}`,
                },
            ],
        },
        {
            label: 'Doba dodávky',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: ISupplyPoint) =>
                        `${formatDate(row.contract.deliveryFrom, 'dd. MM. yyyy', this.locale)} -
                        ${formatDate(row.contract.deliveryTo, 'dd. MM. yyyy', this.locale)}`,
                },
            ],
        },
        {
            label: 'Smlouva',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    contentTemplateName: 'downloadPdfTemplate',
                },
            ],
        },
    ])

}
