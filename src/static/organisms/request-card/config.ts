import {
    CommodityType,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';

export const supplyPointConfig: ISupplyPoint = {
    id: '5456',
    name: 'Byt praha',
    allowedOperations: [],
    commodityType: CommodityType.POWER,
    supplier: {
        id: '',
        name: 'PRE',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    ean: '',
    address: null,
    distributionRate: null,
    circuitBreaker: null,
    phases: null,
    annualConsumptionNT: 0,
    annualConsumptionVT: 0,
    expirationDate: '0',
    subject: null,
    lastAnnualConsumptionNT: 0,
    lastAnnualConsumptionVT: 0,
    lastVersionOfSupplyPoint: false,
    contractEndType: null,
    timeToContractEnd: 0,
    timeToContractEndPeriod: null,
    contract: null,
    progressStatus: ProgressStatus.SUPPLY_POINT,
};

export const supplyPointConfig2: ISupplyPoint = {
    id: '5456',
    name: 'Byt praha',
    allowedOperations: [],
    commodityType: CommodityType.GAS,
    supplier: {
        id: '',
        name: 'PRE',
        vatNumber: '',
        logoPath: '',
        sampleDocuments: [],
    },
    ean: '',
    address: null,
    distributionRate: null,
    circuitBreaker: null,
    phases: null,
    annualConsumptionNT: 0,
    annualConsumptionVT: 0,
    expirationDate: '0',
    subject: null,
    lastAnnualConsumptionNT: 0,
    lastAnnualConsumptionVT: 0,
    lastVersionOfSupplyPoint: false,
    contractEndType: null,
    timeToContractEnd: 0,
    timeToContractEndPeriod: null,
    contract: {
        contractId: '1',
        contractStatus: null,
        deliveryFrom: null,
        deliveryTo: null,
        offerValidity: true,
        offer: {
            id: 0,
            supplier: null,
            commodityType: CommodityType.GAS,
            name: 'Name of offer',
            validFrom: '2019-06-20',
            validTo: '2019-06-29',
            deliveryLength: 1,
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
        },
        personalData: null,
    },
    progressStatus: ProgressStatus.READY_FOR_SIGN,
};
