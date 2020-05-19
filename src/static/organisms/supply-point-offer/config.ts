import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IOffer } from 'src/common/graphql/models/offer.model';

export const offerConfig: IOffer = {
    status: null,
    subject: null,
    benefits: [
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka Zlatá',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka Stříbrná',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka Bronzová',
            url: 'https://www.seznam.cz/',
        },
    ],
    commodityType: CommodityType.POWER,
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    id: 0,
    name: 'Bohemia plus',
    permanentPaymentPrice: 823.00,
    priceGas: 0,
    priceNT: 3.14,
    priceVT: 3.54,
    supplier: {
        id: '',
        name: '_______________________________________________' +
            '__________________________________________________________________________________',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    validFrom: '2019-06-12',
    validTo: new Date().toISOString().split('T')[0],
    accountingRegulatedPrice: 0,
    consumptionPriceNT: 0,
    consumptionPriceVT: 0.1,
    distributionPriceByCapacity: 11,
    distributionPriceByConsumptionNT: 0,
    distributionPriceByConsumptionVT: 17897.92,
    priceGasWithVAT: 11,
    priceNTWithVAT: 54.5,
    priceVTWithVAT: 1532.92,
    energyTaxRegulatedPrice: 0.02,
    marketOrganizerRegulatedPrice: 6.93,
    monthlyConsumptionFee: 100,
    renewableEnergyRegulatedPrice: 0.41,
    systemServicesRegulatedPrice: 0.06,
    totalPrice: 145.79,
    unit: 'MWh',
    greenEnergy: true,
};
