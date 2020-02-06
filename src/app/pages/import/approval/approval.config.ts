import { Injectable } from '@angular/core';

import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class ApprovalConfig {
    public tableCols = {
        POWER: [
            {
                label: 'Název produktu',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.name}`,
                    },
                ],
            },
            {
                label: 'Odběratel',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.subject}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionLocation}`,
                    },
                ],
            },
            {
                label: 'Distribuční sazba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionRate}`,
                    },
                ],
            },
            {
                label: 'Jistič',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.circuitBreaker}`,
                    },
                ],
            },
            {
                label: 'Cena za VT',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right'],
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            {
                label: 'Cena za NT',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right'],
                        contentTemplateName: 'columnTemplatePriceNT',
                    },
                ],
            },
            {
                label: 'Platnost',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateValidFromTo',
                    },
                ],
            },
            {
                label: 'Dodávkové období',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateDeliveryFromTo',
                    },
                ],
            },
            {
                label: 'Délka dodávky',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.deliveryLength}`,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right', 'table--advanced__action-area'],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
        GAS: [
            {
                label: 'Název produktu',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.name}`,
                    },
                ],
            },
            {
                label: 'Odběratel',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.subject}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionLocation}`,
                    },
                ],
            },
            {
                label: 'Spotřeba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.annualConsumption}`,
                    },
                ],
            },
            {
                label: 'Cena',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right'],
                        contentTemplateName: 'columnTemplatePriceGas',
                    },
                ],
            },
            {
                label: 'Platnost',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateValidFromTo',
                    },
                ],
            },
            {
                label: 'Dodávkové období',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplateDeliveryFromTo',
                    },
                ],
            },
            {
                label: 'Délka dodávky',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.deliveryLength}`,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right', 'table--advanced__action-area'],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
    };

    public tableRows = [
        {
            id: 1,
            commodityType: CommodityType.POWER,
            name: 'Variant 36',
            subject: 'Domácnost',
            distributionLocation: 'EON',
            distributionRate: 'C25d',
            circuitBreaker: 'nad 3X80A do 3x100A včetně',
            priceVT: 3.75,
            priceNT: 3.75,
            priceGas: 3.75,
            validFrom: '2019-06-06',
            validTo: '2019-07-06',
            deliveryFrom: '2019-06-06',
            deliveryTo: '2019-10-06',
            deliveryLength: 1,
            permanentPaymentPrice: 650,
        },
        {
            id: 2,
            commodityType: CommodityType.POWER,
            name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
            subject: 'Firma',
            distributionLocation: 'CEZ',
            distributionRate: 'C25d',
            circuitBreaker: 'nad 3X80A do 3x100A včetně',
            priceVT: 3.75,
            priceNT: 3.75,
            priceGas: 3.75,
            validFrom: '2019-06-06',
            validTo: '2019-07-06',
            deliveryFrom: '2019-06-06',
            deliveryTo: '2019-10-06',
            deliveryLength: 2,
            permanentPaymentPrice: 250,
        },
        {
            id: 3,
            commodityType: CommodityType.POWER,
            name: 'Název 1',
            subject: 'domácnost',
            distributionLocation: 'ALL',
            distributionRate: 'C25d',
            circuitBreaker: 'nad 3X80A do 3x100A včetně',
            priceVT: 5.75,
            priceNT: 3.75,
            priceGas: 3.75,
            validFrom: '2019-06-06',
            validTo: '2019-07-06',
            deliveryFrom: '2019-06-06',
            deliveryTo: '2019-10-06',
            deliveryLength: 1,
            permanentPaymentPrice: 3650,
        },
    ];
}
