import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';

export const supplyPointConfig: ISupplyPoint = {
    id: '5456',
    name: 'Byt praha',
    commodityType: 'POWER',
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
    contractEndType: null,
    timeToContractEnd: 0,
    timeToContractEndPeriod: null,
    contract: null,
    progressStatus: ProgressStatus.NOT_CONCLUDED,
};

export const supplyPointConfig2: ISupplyPoint = {
    id: '5456',
    name: 'Byt praha',
    commodityType: 'GAS',
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
    contractEndType: null,
    timeToContractEnd: 0,
    timeToContractEndPeriod: null,
    contract: {
        contractId: '1',
        contractStatus: null,
        deliveryFrom: null,
        deliveryTo: null,
        offer: {
            id: 0,
            supplier: null,
            commodityType: 'GAS',
            name: 'Name of offer',
            validFrom: '2019-06-20',
            validTo: '2019-06-29',
            deliveryLength: 1,
        },
        personalData: null,
    },
    progressStatus: ProgressStatus.SUPPLY_POINT,
};
