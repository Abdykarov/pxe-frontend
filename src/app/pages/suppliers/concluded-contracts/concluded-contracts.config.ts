import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { IPaginationConfig } from 'src/app/pages/suppliers/concluded-contracts/concluded-contracts.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IContractWithNameAndSupplyPoint } from 'src/common/graphql/models/suppplier.model';

@Injectable({
    providedIn: 'root',
})
export class ConcludedContractsConfig {
    constructor(@Inject(LOCALE_ID) private locale: string) {}

    public readonly paginationConfig: IPaginationConfig = {
        itemsPerPage: 50,
        showBoundaryLinks: true,
        maxSize: 5,
        firstText: '<span class="arrow-text">first</span>',
        previousText: '<span class="arrow-text">prev</span>',
        nextText: '<span class="arrow-text">next</span>',
        lastText: '<span class="arrow-text">last</span>',
    };

    public getTableCols = (commodityType: CommodityType) => [
        {
            label: 'Jméno a příjmení',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPoint) =>
                        `${row.name}`,
                },
            ],
        },
        {
            label: commodityType === CommodityType.POWER ? 'EAN' : 'EIC',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row: IContractWithNameAndSupplyPoint) =>
                        `${row.identificationNumber}`,
                },
            ],
        },
        {
            label: 'Doba dodávky',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    contentTemplateName: 'columnTemplateDeliveryTime',
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
    ];
}
