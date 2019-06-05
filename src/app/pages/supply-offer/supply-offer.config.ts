import { Injectable } from '@angular/core';

import * as R from 'ramda';

import {
    ANNUAL_CONSUMPTION_OPTIONS,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyOfferConfig {
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
                label: 'Typ osoby',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${R.find(R.propEq('value', row.subject.code))(SUBJECT_TYPE_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionLocation ? row.distributionLocation.code : ''}`,
                    },
                ],
            },
            {
                label: 'Cena&nbsp;VT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            {
                label: 'Cena&nbsp;NT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
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
                        content: (row) => `${R.find(R.propEq('value', row.deliveryLength))(DELIVERY_LENGTH_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Stálá platba - cena (Kč)',
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
                label: 'Typ osoby',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${R.find(R.propEq('value', row.subject.code))(SUBJECT_TYPE_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionLocation ? row.distributionLocation.code : ''}`,
                    },
                ],
            },
            {
                label: 'Spotřeba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => {
                            return row.annualConsumption ?
                                `${R.find(R.propEq('value', row.annualConsumption.code))(ANNUAL_CONSUMPTION_OPTIONS).label}` : '';
                        },
                    },
                ],
            },
            {
                label: 'Cena (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
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
                        content: (row) => `${R.find(R.propEq('value', row.deliveryLength))(DELIVERY_LENGTH_OPTIONS).label}`,
                    },
                ],
            },
            {
                label: 'Stálá platba - cena (Kč)',
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

    // public tableRows = [
    //     {
    //         id: 1,
    //         commodityType: CommodityType.POWER,
    //         name: 'Variant 36',
    //         subjectTypeId: '1',
    //         distributionLocation: 'EON',
    //         distributionRateId: 'D02D',
    //         circuitBreakerId: '3x(16A, 20A>',
    //         annualConsumptionId: '1',
    //         priceVT: 3.75,
    //         priceNT: 3.75,
    //         priceGas: 3.75,
    //         validFromTo: '31.5.2019',
    //         deliveryFromTo: '31.5.2019',
    //         deliveryLength: '1',
    //         permanentPaymentPrice: 650,
    //     },
    //     {
    //         id: 2,
    //         commodityType: CommodityType.GAS,
    //         name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
    //         subjectTypeId: '2',
    //         distributionLocation: 'CEZ',
    //         distributionRateId: 'D02D',
    //         circuitBreakerId: '3x(16A, 20A>',
    //         annualConsumptionId: '2',
    //         priceVT: 3.75,
    //         priceNT: 3.75,
    //         priceGas: 3.75,
    //         validFromTo: '12.12.2019',
    //         deliveryLength: '2',
    //         permanentPaymentPrice: 250,
    //     },
    //     {
    //         id: 3,
    //         commodityType: CommodityType.GAS,
    //         name: 'Název 1',
    //         subjectTypeId: '1',
    //         distributionLocation: 'ALL',
    //         distributionRateId: 'D02D',
    //         circuitBreakerId: '3x(16A, 20A>',
    //         annualConsumptionId: '3',
    //         priceVT: 5.75,
    //         priceNT: 3.75,
    //         priceGas: 3.75,
    //         validFromTo: '31.5.2019',
    //         deliveryFromTo: '31.5.2019',
    //         deliveryLength: '1',
    //         permanentPaymentPrice: 3650,
    //     },
    //     {
    //         id: 4,
    //         commodityType: CommodityType.POWER,
    //         name: 'Variant 36',
    //         subjectTypeId: '1',
    //         distributionLocation: 'EON',
    //         distributionRateId: 'D02D',
    //         circuitBreakerId: '3x(16A, 20A>',
    //         annualConsumptionId: '1',
    //         priceVT: 3.75,
    //         priceNT: 3.75,
    //         priceGas: 3.75,
    //         validFromTo: '31.5.2019',
    //         deliveryFromTo: '31.5.2019',
    //         deliveryLength: '1',
    //         permanentPaymentPrice: 650,
    //     },
    //     {
    //         id: 5,
    //         commodityType: CommodityType.POWER,
    //         name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
    //         subjectTypeId: '1',
    //         distributionLocation: 'EON',
    //         distributionRateId: 'D02D',
    //         circuitBreakerId: '3x(16A, 20A>',
    //         annualConsumptionId: '2',
    //         priceVT: 3.75,
    //         priceNT: 3.75,
    //         priceGas: 3.75,
    //         validFromTo: '1.1.2019 - 12.12.2019',
    //         deliveryFromTo: '1.1.2019',
    //         deliveryLength: '1',
    //         permanentPaymentPrice: 250,
    //     },
    //     {
    //         id: 6,
    //         commodityType: CommodityType.POWER,
    //         name: 'Název 1',
    //         subjectTypeId: '1',
    //         distributionLocation: 'EON',
    //         distributionRateId: 'D02D',
    //         circuitBreakerId: '3x(16A, 20A>',
    //         annualConsumptionId: '1',
    //         priceVT: 3.75,
    //         priceNT: 3.75,
    //         priceGas: 3.75,
    //         validFromTo: '31.5.2019',
    //         deliveryFromTo: '31.5.2019',
    //         deliveryLength: '1',
    //         permanentPaymentPrice: 3650,
    //     },
    // ];

    public supplyOfferCommodityTypes = {
        power: CommodityType.POWER,
        gas: CommodityType.GAS,
    };
}
