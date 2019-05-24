import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { NewSupplyPointPageConfig } from 'src/static/pages/new-supply-point/config';

@Injectable({
    providedIn: 'root',
})
export class SupplyOfferOrganismConfig {
    public tableCols = {
        main: [
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
                        content: (row) => `${R.find(R.propEq('value', row.subjectTypeId))(this.subjectTypeOptions).label}`,
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
            // POWER ONLY
            {
                label: 'Distribuční sazba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.distributionRateId}`,
                    },
                ],
            },
            // POWER ONLY
            {
                label: 'Jistič',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${R.find(R.propEq('value', row.circuitBreakerId))
                        (this.newSupplyPointPageConfig.circuitBreakerOptions).label}`,
                    },
                ],
            },
            // GAS ONLY
            // {
            //     label: 'Spotřeba',
            //     views: [
            //         {
            //             headingClass: [''],
            //             cellClass: [''],
            //             content: (row) => `${R.find(R.propEq('value', row.annualConsumptionId))(this.annualConsumptionOptions).label}`,
            //         },
            //     ],
            // },
            // POWER ONLY
            {
                label: 'Cena&nbsp;VT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        // content: (row) => `${row.priceVT}`,
                        contentTemplateName: 'columnTemplatePriceVT',
                    },
                ],
            },
            // POWER ONLY
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
            // GAS ONLY
            // {
            //     label: 'Cena (MWh/Kč)',
            //     views: [
            //         {
            //             headingClass: [''],
            //             cellClass: [''],
            //             contentTemplateName: 'columnTemplatePriceGas',
            //         },
            //     ],
            // },
            {
                label: 'Platnost',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.validFromTo}`,
                    },
                ],
            },
            {
                label: 'Dodávkové období',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.validFromTo}`,
                    },
                ],
            },
            {
                label: 'Délka dodávky',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${R.find(R.propEq('value', row.deliveryLength))(this.deliveryLengthOptions).label}`,
                    },
                ],
            },
            {
                label: 'Měsíční záloha (Kč)',
                views: [
                    {
                        headingClass: ['', 'text-right'],
                        cellClass: ['', 'text-right', 'table--advanced__action-area'],
                        // content: (row) => `${row.cashAdvance.value}`,
                        contentTemplateName: 'actionColumnTemplatePower',
                    },
                ],
            },
        ],
    };

    public tableRows = {
        main: [
            {
                name: 'Variant 36',
                subjectTypeId: '1',
                distributionLocation: 'EON',
                distributionRateId: 'D02D',
                circuitBreakerId: '3x(16A, 20A>',
                annualConsumptionId: '1',
                priceVT: 3.75,
                priceNT: 3.75,
                priceGas: 3.75,
                validFromTo: '31.5.2019',
                deliveryFromTo: '31.5.2019',
                deliveryLength: '1',
                permanentPaymentPrice: 650,
            },
            {
                name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
                subjectTypeId: '2',
                distributionLocation: 'CEZ',
                distributionRateId: 'D02D',
                circuitBreakerId: '3x(16A, 20A>',
                annualConsumptionId: '2',
                priceVT: 3.75,
                priceNT: 3.75,
                priceGas: 3.75,
                validFromTo: '12.12.2019',
                deliveryLength: '2',
                permanentPaymentPrice: 250,
            },
            {
                name: 'Název 1',
                subjectTypeId: '1',
                distributionLocation: 'ALL',
                distributionRateId: 'D02D',
                circuitBreakerId: '3x(16A, 20A>',
                annualConsumptionId: '3',
                priceVT: 5.75,
                priceNT: 3.75,
                priceGas: 3.75,
                validFromTo: '31.5.2019',
                deliveryFromTo: '31.5.2019',
                deliveryLength: '1',
                permanentPaymentPrice: 3650,
            },
            {
                name: 'Variant 36',
                subjectTypeId: '1',
                distributionLocation: 'EON',
                distributionRateId: 'D02D',
                circuitBreakerId: '3x(16A, 20A>',
                annualConsumptionId: '1',
                priceVT: 3.75,
                priceNT: 3.75,
                priceGas: 3.75,
                validFromTo: '31.5.2019',
                deliveryFromTo: '31.5.2019',
                deliveryLength: '1',
                permanentPaymentPrice: 650,
            },
            {
                name: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019',
                subjectTypeId: '1',
                distributionLocation: 'EON',
                distributionRateId: 'D02D',
                circuitBreakerId: '3x(16A, 20A>',
                annualConsumptionId: '2',
                priceVT: 3.75,
                priceNT: 3.75,
                priceGas: 3.75,
                validFromTo: '1.1.2019 - 12.12.2019',
                deliveryFromTo: '1.1.2019',
                deliveryLength: '1',
                permanentPaymentPrice: 250,
            },
            {
                name: 'Název 1',
                subjectTypeId: '1',
                distributionLocation: 'EON',
                distributionRateId: 'D02D',
                circuitBreakerId: '3x(16A, 20A>',
                annualConsumptionId: '1',
                priceVT: 3.75,
                priceNT: 3.75,
                priceGas: 3.75,
                validFromTo: '31.5.2019',
                deliveryFromTo: '31.5.2019',
                deliveryLength: '1',
                permanentPaymentPrice: 3650,
            },
        ],
    };

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

    constructor(
        public newSupplyPointPageConfig: NewSupplyPointPageConfig,
    ) {}
}
