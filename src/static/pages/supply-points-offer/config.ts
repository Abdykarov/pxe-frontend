import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IOffer } from 'src/common/graphql/models/offer.model';

export const offerConfig1: IOffer = {
    id: 0,
    supplier: {
        id: '',
        name: 'PRE',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    commodityType: CommodityType.POWER,
    name: '',
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
    benefits: [
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
    ],
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    permanentPaymentPrice: 823.00,
    priceGas: 10,
    priceNT: 3.14,
    priceVT: 3.54,
    accountingRegulatedPrice: 0,
    consumptionPriceNT: 0.5,
    consumptionPriceVT: 0.1,
    priceGasWithVAT: 11,
    priceNTWithVAT: 0,
    priceVTWithVAT: 1.92,
    distributionPriceByCapacity: 11,
    distributionPriceByConsumptionNT: 0,
    distributionPriceByConsumptionVT: 1.92,
    energyTaxRegulatedPrice: 0.02,
    marketOrganizerRegulatedPrice: 6.93,
    monthlyConsumptionFee: 100,
    renewableEnergyRegulatedPrice: 0.41,
    systemServicesRegulatedPrice: 0.06,
    totalPrice: 145.72,
    unit: 'MWh',
    status: null,
    subject: null,
};

export const offerConfig2: IOffer = {
    status: null,
    subject: null,
    benefits: [
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
    ],
    commodityType: CommodityType.GAS,
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 869.00,
    priceGas: 0.9,
    priceNT: 2.64,
    priceVT: 6.54,
    supplier: {
        id: '',
        name: 'Pražská plynárenská',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
    accountingRegulatedPrice: 0,
    consumptionPriceNT: 0,
    consumptionPriceVT: 0.1,
    distributionPriceByCapacity: 11,
    distributionPriceByConsumptionNT: 0,
    distributionPriceByConsumptionVT: 1.92,
    energyTaxRegulatedPrice: 0.02,
    priceGasWithVAT: 11,
    priceNTWithVAT: 0,
    priceVTWithVAT: 1.92,
    marketOrganizerRegulatedPrice: 6.93,
    monthlyConsumptionFee: 100,
    renewableEnergyRegulatedPrice: 0.41,
    systemServicesRegulatedPrice: 0.06,
    totalPrice: 145.72,
    unit: 'MWh',
};

export const offerConfig3: IOffer = {
    status: null,
    subject: null,
    benefits: [
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
        {
            name: 'Žárovka LED Lorem',
            url: 'https://www.seznam.cz/',
        },
    ],
    commodityType: CommodityType.POWER,
    deliveryFrom: '',
    deliveryTo: '',
    deliveryLength: 1,
    id: 0,
    name: '',
    permanentPaymentPrice: 880.00,
    priceGas: 0,
    priceNT: 2.64,
    priceVT: 6.54,
    supplier: {
        id: '',
        name: 'ČEZ',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    validFrom: '2019-03-12T22:59:12.133Z',
    validTo: new Date(new Date().getTime() + 3600 * 1000 * 24).toISOString(),
    accountingRegulatedPrice: 0,
    consumptionPriceNT: 0.2,
    consumptionPriceVT: 0.1,
    distributionPriceByCapacity: 11,
    distributionPriceByConsumptionNT: 0,
    distributionPriceByConsumptionVT: 1.92,
    energyTaxRegulatedPrice: 0.02,
    marketOrganizerRegulatedPrice: 6.93,
    monthlyConsumptionFee: 100,
    renewableEnergyRegulatedPrice: 0.41,
    systemServicesRegulatedPrice: 0.06,
    priceGasWithVAT: 11,
    priceNTWithVAT: 0,
    priceVTWithVAT: 1.92,
    totalPrice: 145.72,
    unit: 'MWh',
};
