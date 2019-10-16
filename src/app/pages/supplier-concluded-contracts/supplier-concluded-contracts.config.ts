import { formatDate } from '@angular/common';
import {
    Inject,
    Injectable,
    LOCALE_ID,
} from '@angular/core';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IContractWithNameAndSupplyPointEan } from 'src/common/graphql/models/suppplier.model';
import { IPaginationConfig } from 'src/app/pages/supplier-concluded-contracts/supplier-concluded-contracts.model';

@Injectable({
    providedIn: 'root',
})
export class SupplierConcludedContractsConfig {

    constructor(
        @Inject(LOCALE_ID) private locale: string,
    ) {}

    public readonly paginationConfig: IPaginationConfig = {
        itemsPerPage: 50,
        showBoundaryLinks: true,
        maxSize: 5,
        firstText: '<span class="arrow-text">first</span>',
        previousText: '<span class="arrow-text">prev</span>',
        nextText: '<span class="arrow-text">next</span>',
        lastText: '<span class="arrow-text">last</span>',
    };

    public getTableCols = (commodityType: CommodityType) => ([
        {
            label: 'Jméno a příjmení',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPointEan) => `${row.name}`,
                },
            ],
        },
        {
            label: commodityType === CommodityType.POWER.toLowerCase() ? 'EAN' : 'EIC',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPointEan) => `${row.ean}`,
                },
            ],
        },
        {
            label: 'Doba dodávky',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPointEan) =>
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
