import { ISupplyPointFindData } from 'src/common/graphql/models/supply.model';

export const supplyPointConfig: ISupplyPointFindData = {
    id: 'U3VwcGx5UG9pbnQ6MTM3Mjg0MTU1',
    commodityType: 'POWER',
    supplier: {
        id: 'U3VwcGxpZXI6MjI3ODYyNDA1Mw',
        name: 'Eichmann LLC',
        vatNumber: '264264896',
        suplierSampleDocuments: [
            {
                type: 'email',
                url: 'http: // lorempixel.com/640/480',
            },
            {
                type: 'email',
                url: 'http: // lorempixel.com/640/480',
            },
        ],
    },
    ean: 'SAMPLE - EAN',
    region: 'MYREGION',
    address: {
        street: 'Legros Vista',
        orientationNumber: '46533',
        descriptiveNumber: '62934',
        city: 'North Jovan',
        postCode: '14895 - 5074',
    },
    distributionRate: {
        type: 'DISTRRATE',
        code: 'NEVIM',
        description: 'Rate 1',
        help: 'help 2',
    },
    circuitBreaker: {
        type: 'CIRCTBREAKERS',
        code: 'NEVIM',
        description: 'Breaker1',
        help: 'help 2',
    },
    annualConsumptionNT: 1529.25,
    expirationDate: '2020 - 03 - 22T23: 57: 28.997Z',
    subject: {
        type: 'SUBJECT',
        code: '1',
        description: 'fyzicka osoba',
        help: 'Help 1',
    },
    lastAnnualConsumptionNT: 1529.25,
    lastAnnualConsumptionVT: 1529.25,
};
