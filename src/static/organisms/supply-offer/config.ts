import { Injectable } from '@angular/core';

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
                        content: (row) => `${row.name.value}`,
                    },
                ],
            },
            {
                label: 'Typ osoby',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.subjectTypeId}`,
                    },
                ],
            },
            {
                label: 'Distribuční umístění',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.location.value}`,
                    },
                ],
            },
            {
                label: 'Distribuční sazba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.rate.value}`,
                    },
                ],
            },
            {
                label: 'Jistič',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.rate.value}`,
                    },
                ],
            },
            {
                label: 'Spotřeba',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.rate.value}`,
                    },
                ],
            },
            // {
            //     label: 'Roční&nbsp;spotřeba elektřiny&nbsp;VT',
            //     views: [
            //         {
            //             headingClass: [''],
            //             cellClass: [''],
            //             content: (row) => `${row.consumptionHighTarif.value}`,
            //         },
            //     ],
            // },
            // {
            //     label: 'Roční&nbsp;spotřeba elektřiny&nbsp;NT',
            //     views: [
            //         {
            //             headingClass: [''],
            //             cellClass: [''],
            //             content: (row) => `${row.consumptionLowTarif.value}`,
            //         },
            //     ],
            // },
            {
                label: 'Cena&nbsp;VT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.priceHighTarif.value}`,
                    },
                ],
            },
            {
                label: 'Cena&nbsp;NT (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.priceLowTarif.value}`,
                    },
                ],
            },
            {
                label: 'Cena (MWh/Kč)',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.priceLowTarif.value}`,
                    },
                ],
            },
            {
                label: 'Platnost',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.period.value}`,
                    },
                ],
            },
            {
                label: 'Dodávkové období',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.period.value}`,
                    },
                ],
            },
            {
                label: 'Délka dodávky',
                views: [
                    {
                        headingClass: [''],
                        cellClass: [''],
                        content: (row) => `${row.period.value}`,
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
                name: { value: 'Variant 36' },
                subjectTypeId: '1',
                location: { value: 'Praha' },
                rate: { value: 'D02D' },
                // consumptionHighTarif: { value: '1,62&nbsp;MWh' },
                // consumptionLowTarif: { value: '0&nbsp;MWh' },
                priceHighTarif: { value: '3,75' },
                priceLowTarif: { value: '3,20' },
                period: { value: '31.5.2019' },
                cashAdvance: { value: '650' },
            },
            {
                name: { value: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019' },
                location: { value: 'Praha' },
                rate: { value: 'D02D' },
                // consumptionHighTarif: { value: '1,62&nbsp;MWh' },
                // consumptionLowTarif: { value: '0&nbsp;MWh' },
                priceHighTarif: { value: '3,75' },
                priceLowTarif: { value: '3,20' },
                period: { value: '1.1.2019 - 12.12.2019' },
                cashAdvance: { value: '250' },
            },
            {
                name: { value: 'Název 1' },
                location: { value: 'Praha' },
                rate: { value: 'D02D' },
                // consumptionHighTarif: { value: '1,62&nbsp;MWh' },
                // consumptionLowTarif: { value: '0&nbsp;MWh' },
                priceHighTarif: { value: '5,75' },
                priceLowTarif: { value: '2,20' },
                period: { value: '31.5.2019' },
                cashAdvance: { value: '3&nbsp;650' },
            },
            {
                name: { value: 'Variant 36' },
                location: { value: 'Praha' },
                rate: { value: 'D02D' },
                // consumptionHighTarif: { value: '1,62&nbsp;MWh' },
                // consumptionLowTarif: { value: '0&nbsp;MWh' },
                priceHighTarif: { value: '3,75' },
                priceLowTarif: { value: '3,20' },
                period: { value: '31.5.2019' },
                cashAdvance: { value: '650' },
            },
            {
                name: { value: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019' },
                location: { value: 'Praha' },
                rate: { value: 'D02D' },
                // consumptionHighTarif: { value: '1,62&nbsp;MWh' },
                // consumptionLowTarif: { value: '0&nbsp;MWh' },
                priceHighTarif: { value: '3,75' },
                priceLowTarif: { value: '3,20' },
                period: { value: '1.1.2019 - 12.12.2019' },
                cashAdvance: { value: '250' },
            },
            {
                name: { value: 'Název 1' },
                location: { value: 'Praha' },
                rate: { value: 'D02D' },
                // consumptionHighTarif: { value: '1,62&nbsp;MWh' },
                // consumptionLowTarif: { value: '0&nbsp;MWh' },
                priceHighTarif: { value: '5,75' },
                priceLowTarif: { value: '2,20' },
                period: { value: '31.5.2019' },
                cashAdvance: { value: '3&nbsp;650' },
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
}
