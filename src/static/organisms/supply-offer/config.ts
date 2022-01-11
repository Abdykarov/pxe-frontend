import { Injectable } from '@angular/core';
import * as R from 'ramda';
import {
    ANNUAL_CONSUMPTION_OPTIONS,
    DELIVERY_LENGTH_OPTIONS,
    SUBJECT_TYPE_OPTIONS,
} from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';

@Injectable({
    providedIn: 'root',
})
export class SupplyOfferOrganismConfig {
    public tableCols = {
        POWER: [
            {
                label: 'Označit',
                contentTemplateHeaderName: 'columnTemplateMarkAll',
                views: [
                    {
                        contentTemplateName: 'columnTemplateMark',
                    },
                ],
            },
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
                        content: (row) =>
                            `${
                                R.find(R.propEq('value', row.subject.code))(
                                    SUBJECT_TYPE_OPTIONS
                                ).label
                            }`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) =>
                            `${
                                row.distributionLocation
                                    ? row.distributionLocation.code
                                    : ''
                            }`,
                    },
                ],
            },
            {
                label: 'Distribuční sazba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) =>
                            `${
                                R.find(
                                    R.propEq('value', row.distributionRate.code)
                                )(this.distributionRateOptions).label
                            }`,
                    },
                ],
            },
            {
                label: 'Jistič',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) =>
                            `${
                                R.find(
                                    R.propEq('value', row.circuitBreaker.code)
                                )(this.circuitBreakerOptions).label
                            }`,
                    },
                ],
            },
            {
                label: 'Cena za VT',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: ['text-right'],
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            {
                label: 'Cena za NT',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: ['text-right'],
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
                        content: (row) =>
                            `${
                                R.find(R.propEq('value', row.deliveryLength))(
                                    DELIVERY_LENGTH_OPTIONS
                                ).label
                            }`,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: [
                            'text-right',
                            'table--advanced__action-area',
                        ],
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
                        content: (row) =>
                            `${
                                R.find(R.propEq('value', row.subject.code))(
                                    SUBJECT_TYPE_OPTIONS
                                ).label
                            }`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) =>
                            `${
                                row.distributionLocation
                                    ? row.distributionLocation.code
                                    : ''
                            }`,
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
                            return row.annualConsumption
                                ? `${
                                      R.find(
                                          R.propEq(
                                              'value',
                                              row.annualConsumption.code
                                          )
                                      )(ANNUAL_CONSUMPTION_OPTIONS).label
                                  }`
                                : '';
                        },
                    },
                ],
            },
            {
                label: 'Cena',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: ['text-right'],
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
                        content: (row) =>
                            `${
                                R.find(R.propEq('value', row.deliveryLength))(
                                    DELIVERY_LENGTH_OPTIONS
                                ).label
                            }`,
                    },
                ],
            },
            {
                label: 'Stálá platba',
                views: [
                    {
                        headingClass: ['text-right'],
                        cellClass: [
                            'text-right',
                            'table--advanced__action-area',
                        ],
                        contentTemplateName: 'actionColumnTemplate',
                    },
                ],
            },
        ],
    };

    public tableRows = [
        {
            id: 1,
            greenEnergy: false,
            commodityType: CommodityType.POWER,
            name: 'Variant 36',
            subject: {
                code: '1',
            },
            distributionLocation: {
                code: 'EON',
            },
            distributionRate: {
                code: 'C25d',
            },
            circuitBreaker: {
                code: '3x(80A, 100A>',
            },
            annualConsumption: {
                code: '1',
            },
            priceVT: 3.75,
            priceNT: 3.75,
            priceGas: 3.75,
            validFrom: '2019-06-06',
            validTo: '2019-07-06',
            deliveryFrom: '2019-06-06',
            deliveryTo: '2019-10-06',
            deliveryLength: 1,
            permanentPaymentPrice: 650,
            marked: true,
        },
        {
            id: 2,
            commodityType: CommodityType.GAS,
            name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
            subject: {
                code: '2',
            },
            distributionLocation: {
                code: 'CEZ',
            },
            distributionRate: {
                code: 'C25d',
            },
            circuitBreaker: {
                code: '3x(80A, 100A>',
            },
            annualConsumption: {
                code: '2',
            },
            priceVT: 3.75,
            priceNT: 3.75,
            priceGas: 3.75,
            validFrom: '2019-06-06',
            validTo: '2019-07-06',
            deliveryFrom: '2019-06-06',
            deliveryTo: '2019-10-06',
            deliveryLength: 2,
            permanentPaymentPrice: 250,
            marked: true,
        },
        {
            id: 3,
            greenEnergy: true,
            commodityType: CommodityType.GAS,
            name: 'Název 1',
            subject: {
                code: '1',
            },
            distributionLocation: {
                code: 'ALL',
            },
            distributionRate: {
                code: 'C25d',
            },
            circuitBreaker: {
                code: '3x(80A, 100A>',
            },
            annualConsumption: {
                code: '1',
            },
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
        {
            id: 4,
            greenEnergy: false,
            commodityType: CommodityType.POWER,
            name: 'Variant 36',
            subject: {
                code: '1',
            },
            distributionLocation: {
                code: 'EON',
            },
            distributionRate: {
                code: 'C25d',
            },
            circuitBreaker: {
                code: '3x(80A, 100A>',
            },
            annualConsumption: {
                code: '1',
            },
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
            id: 5,
            commodityType: CommodityType.POWER,
            name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
            subject: {
                code: '1',
            },
            distributionLocation: {
                code: 'EON',
            },
            distributionRate: {
                code: 'C25d',
            },
            circuitBreaker: {
                code: '3x(80A, 100A>',
            },
            annualConsumption: {
                code: '1',
            },
            priceVT: 3.75,
            priceNT: 3.75,
            priceGas: 3.75,
            validFrom: '2019-06-06',
            validTo: '2019-07-06',
            deliveryFrom: '2019-06-06',
            deliveryTo: '2019-10-06',
            deliveryLength: 1,
            permanentPaymentPrice: 250,
        },
        {
            id: 6,
            greenEnergy: false,
            commodityType: CommodityType.POWER,
            name: 'Název 1',
            subject: {
                code: '1',
            },
            distributionLocation: {
                code: 'EON',
            },
            distributionRate: {
                code: 'C25d',
            },
            circuitBreaker: {
                code: '3x(80A, 100A>',
            },
            annualConsumption: {
                code: '1',
            },
            priceVT: 3.75,
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

    public subjectTypeOptions = [
        {
            key: 1,
            value: '1',
            label: 'Domácnost',
        },
        {
            key: 2,
            value: '2',
            label: 'Firma',
        },
    ];

    public deliveryLengthOptions = [
        {
            key: 1,
            value: '1',
            label: '1 rok',
        },
        {
            key: 2,
            value: '2',
            label: '2 roky',
        },
    ];

    public distributionRateOptions = [
        {
            key: 'C03d',
            value: 'C03d',
            label: 'C03d',
        },
        {
            key: 'C25d',
            value: 'C25d',
            label: 'C25d',
        },
    ];

    public circuitBreakerOptions = [
        {
            key: '<= 1x25A',
            value: '<= 1x25A',
            label: 'menší než 1x25A včetně',
        },
        {
            key: '3x(80A, 100A>',
            value: '3x(80A, 100A>',
            label: 'nad 3X80A do 3x100A včetně',
        },
    ];

    public annualConsumptionOptions = [
        {
            key: 1,
            value: '1',
            label: 'do 1,89 MWh',
        },
        {
            key: 2,
            value: '2',
            label: '1,89 - 7,56 MWh',
        },
        {
            key: 3,
            value: '3',
            label: '7,56 - 15 MWh',
        },
        {
            key: 4,
            value: '4',
            label: '15 - 25 MWh',
        },
        {
            key: 5,
            value: '5',
            label: '25 - 45 MWh',
        },
        {
            key: 6,
            value: '6',
            label: '45 - 63 MWh',
        },
    ];

    constructor(public newSupplyPointPageConfig: NewSupplyPointPageConfig) {}
}
