import { formatDate } from '@angular/common';

import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export const tableCols = [
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
        label: 'EAN',
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
]
