import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';

export const supplyPointConfigPower: ISupplyPoint = {
    id: '72',
    name: 'Vilka',
    commodityType: CommodityType.GAS,
    supplier: {
        id: '6049',
        name: 'Test Agata',
        vatNumber: '5348641',
        logoPath: '',
        sampleDocuments: [],
    },
    ean: '859182400813432086',
    address: {
        street: 'Milady Horákové',
        orientationNumber: '46',
        descriptiveNumber: '491',
        city: 'Svitavy',
        postCode: '56802',
        region: 'Pardubický kraj',
    },
    distributionRate: {
        type: 'DSTP4R',
        code: 'C01d',
        description: 'C01d',
        help: 'C01d',
    },
    contract: {
        offerValidity: true,
        deliveryTo: '2021-08-01',
        deliveryFrom: '2020-08-01',
        personalData: {
            name: '',
            birthDate: '',
            ico: '',
            dic: '',
            address1: null,
            address2: null,
            email: '',
            phone: '',
            bankAccountNumber: '',
            bankCode: '',
            depositPaymentType: {
                type: '',
                code: '',
                description: '',
                help: '',
            },
            deposit: 1000,
        },
        offer: {
            status: null,
            subject: null,
            permanentPaymentPrice: 0,
            benefits: [
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
            priceGas: 0,
            priceNT: 3.14,
            priceVT: 3.54,
            supplier: {
                id: '',
                name: 'PRE',
                vatNumber: '',
                logoPath: '',
                sampleDocuments: [],
            },
            validFrom: '2019-03-12',
            validTo: new Date().toISOString().split('T')[0],
            accountingRegulatedPrice: 0,
            consumptionPriceNT: 0,
            consumptionPriceVT: 0.1,
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
            prepayment: 1000,
            greenEnergy: false,
        },
    },
    circuitBreaker: {
        type: 'JISTIC',
        code: '<= 1x25A',
        description: 'menší než 1x25A včetně',
        help: 'menší než 1x25A včetně',
    },
    annualConsumptionNT: 1.15,
    annualConsumptionVT: 1.15,
    expirationDate: '2019-05-17',
    subject: {
        type: 'TPSB',
        code: '1',
        description: 'Fyzická osoba',
        help: 'Fyzická osoba',
    },
    lastAnnualConsumptionNT: 1.25,
    lastAnnualConsumptionVT: 1.35,
    allowedOperations: null,
    progressStatus: null,
    phases: null,
    lastVersionOfSupplyPoint: false,
    contractEndType: null,
    timeToContractEnd: null,
    timeToContractEndPeriod: null,
};


export const supplyPointConfigGas: ISupplyPoint = {
    id: '77',
    name: 'Můj byt',
    commodityType: CommodityType.GAS,
    supplier: {
        id: '6049',
        name: 'Test Agata',
        vatNumber: '5348641',
        logoPath: '',
        sampleDocuments: [],
    },
    contract: {
        offerValidity: true,
        deliveryTo: '2021-08-01',
        deliveryFrom: '2020-08-01',
        personalData: {
            name: '',
            birthDate: '',
            ico: '',
            dic: '',
            address1: null,
            address2: null,
            email: '',
            phone: '',
            bankAccountNumber: '',
            bankCode: '',
            depositPaymentType: {
                type: '',
                code: '',
                description: '',
                help: '',
            },
            deposit: 1000,
        },
        offer: {
            status: null,
            subject: null,
            permanentPaymentPrice: 0,
            benefits: [
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
            priceGas: 0,
            priceNT: 3.14,
            priceVT: 3.54,
            supplier: {
                id: '',
                name: 'PRE',
                vatNumber: '',
                logoPath: '',
                sampleDocuments: [],
            },
            validFrom: '2019-03-12',
            validTo: new Date().toISOString().split('T')[0],
            accountingRegulatedPrice: 0,
            consumptionPriceNT: 0,
            consumptionPriceVT: 0.1,
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
            prepayment: 1000,
            greenEnergy: true,
        },
    },
    ean: '27zg700z0069625e',
    address: {
        street: 'Milady Horákové',
        orientationNumber: '46',
        descriptiveNumber: '491',
        city: 'Svitavy',
        postCode: '56802',
        region: 'Pardubický kraj',
    },
    distributionRate: null,
    circuitBreaker: null,
    annualConsumptionNT: null,
    annualConsumptionVT: null,
    expirationDate: '2019-05-17',
    subject: {
        type: 'TPSB',
        code: '1',
        description: 'Fyzická osoba',
        help: 'Fyzická osoba',
    },
    lastAnnualConsumptionNT: null,
    lastAnnualConsumptionVT: 1.35,
    allowedOperations: null,
    progressStatus: null,
    phases: null,
    lastVersionOfSupplyPoint: false,
    contractEndType: null,
    timeToContractEnd: null,
    timeToContractEndPeriod: null,
};
