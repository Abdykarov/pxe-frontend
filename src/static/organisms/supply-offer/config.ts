export const tableCols = {
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
            label: 'Roční&nbsp;spotřeba elektřiny&nbsp;VT',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row) => `${row.consumptionHighTarif.value}`,
                },
            ],
        },
        {
            label: 'Roční&nbsp;spotřeba elektřiny&nbsp;NT',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row) => `${row.consumptionLowTarif.value}`,
                },
            ],
        },
        {
            label: 'Cena&nbsp;VT',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row) => `${row.priceHighTarif.value}`,
                },
            ],
        },
        {
            label: 'Cena&nbsp;NT',
            views: [
                {
                    headingClass: [''],
                    cellClass: [''],
                    content: (row) => `${row.priceLowTarif.value}`,
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
            label: 'Měsíční záloha',
            views: [
                {
                    headingClass: ['', 'text-right'],
                    cellClass: ['', 'text-right'],
                    content: (row) => `${row.cashAdvance.value}`,
                },
            ],
        },
    ],
};

export const tableRows = {
    main: [
        {
            name: { value: 'Variant 36' },
            location: { value: 'Praha' },
            rate: { value: 'D02D' },
            consumptionHighTarif: { value: '1,62&nbsp;MWh' },
            consumptionLowTarif: { value: '0&nbsp;MWh' },
            priceHighTarif: { value: '3,75&nbsp;MWh/Kč' },
            priceLowTarif: { value: '3,20&nbsp;MWh/Kč' },
            period: { value: '31.5.2019' },
            cashAdvance: { value: '650&nbsp;Kč' },
        },
        {
            name: { value: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019' },
            location: { value: 'Praha' },
            rate: { value: 'D02D' },
            consumptionHighTarif: { value: '1,62&nbsp;MWh' },
            consumptionLowTarif: { value: '0&nbsp;MWh' },
            priceHighTarif: { value: '3,75&nbsp;MWh/Kč' },
            priceLowTarif: { value: '3,20&nbsp;MWh/Kč' },
            period: { value: '1.1.2019 - 12.12.2019' },
            cashAdvance: { value: '250&nbsp;Kč' },
        },
        {
            name: { value: 'Název 1' },
            location: { value: 'Praha' },
            rate: { value: 'D02D' },
            consumptionHighTarif: { value: '1,62&nbsp;MWh' },
            consumptionLowTarif: { value: '0&nbsp;MWh' },
            priceHighTarif: { value: '5,75&nbsp;MWh/Kč' },
            priceLowTarif: { value: '2,20&nbsp;MWh/Kč' },
            period: { value: '31.5.2019' },
            cashAdvance: { value: '3&nbsp;650&nbsp;Kč' },
        },
        {
            name: { value: 'Variant 36' },
            location: { value: 'Praha' },
            rate: { value: 'D02D' },
            consumptionHighTarif: { value: '1,62&nbsp;MWh' },
            consumptionLowTarif: { value: '0&nbsp;MWh' },
            priceHighTarif: { value: '3,75&nbsp;MWh/Kč' },
            priceLowTarif: { value: '3,20&nbsp;MWh/Kč' },
            period: { value: '31.5.2019' },
            cashAdvance: { value: '650&nbsp;Kč' },
        },
        {
            name: { value: 'Zelená usporám od&nbsp;1.1.2019 do&nbsp;12.12.2019' },
            location: { value: 'Praha' },
            rate: { value: 'D02D' },
            consumptionHighTarif: { value: '1,62&nbsp;MWh' },
            consumptionLowTarif: { value: '0&nbsp;MWh' },
            priceHighTarif: { value: '3,75&nbsp;MWh/Kč' },
            priceLowTarif: { value: '3,20&nbsp;MWh/Kč' },
            period: { value: '1.1.2019 - 12.12.2019' },
            cashAdvance: { value: '250&nbsp;Kč' },
        },
        {
            name: { value: 'Název 1' },
            location: { value: 'Praha' },
            rate: { value: 'D02D' },
            consumptionHighTarif: { value: '1,62&nbsp;MWh' },
            consumptionLowTarif: { value: '0&nbsp;MWh' },
            priceHighTarif: { value: '5,75&nbsp;MWh/Kč' },
            priceLowTarif: { value: '2,20&nbsp;MWh/Kč' },
            period: { value: '31.5.2019' },
            cashAdvance: { value: '3&nbsp;650&nbsp;Kč' },
        },
    ],
};
