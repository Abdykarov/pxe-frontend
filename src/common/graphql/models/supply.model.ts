import { IContract } from './contract';

export enum CommodityType {
    POWER = 'POWER',
    GAS = 'GAS',
}

export enum DistributionType {
    VT = 'VT',
    BOTH = 'BOTH',
}

export enum SubjectType {
    SUBJECT_TYPE_INDIVIDUAL = '1',
    SUBJECT_TYPE_BUSINESSMAN = '2',
}

export interface IAddress {
    street: string;
    orientationNumber: string;
    descriptiveNumber: string;
    city: string;
    postCode: string;
    region: string;
    __typename?: string;
}

export interface ICodelistMap {
    codelistType: string;
    codelistItems: [ICodelistItem];
}

export interface ICodelistItem {
    type: string;
    code: string;
    description: string;
    help: string;
    __typename?: string;
}

export interface ISupplier {
    id: string;
    name: string;
    vatNumber: string;
    logoPath?: string;
    sampleDocuments: ISupplierSampleDocument[];
}

export interface IGetSupplyPointResponse {
    getSupplyPoint: ISupplyPoint;
}

export interface ISupplierSampleDocument {
    type: string;
    url: string;
}

export interface ISupplyPointGasAttributes {
    eic: string;
    annualConsumption: number;
}

export interface ISupplyPointPowerAttributes {
    ean: string;
    circuitBreakerId: string;
    phasesId: string;
    distributionRateId: string;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
}

export interface ISupplyPoint {
    id: string;
    name: string;
    commodityType: string;
    supplier: ISupplier;
    ean: string;
    address: IAddress;
    distributionRate: ICodelistItem;
    circuitBreaker: ICodelistItem;
    phases: ICodelistItem;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
    expirationDate: string;
    subject: ICodelistItem;
    lastAnnualConsumptionNT: number;
    lastAnnualConsumptionVT: number;
    contractEndType: ICodelistItem;
    timeToContractEnd: number;
    timeToContractEndPeriod: ICodelistItem;
    contract: IContract;
}

export interface ISelectedOffer {
    id: number;
    supplier?: ISupplier;
    commodityType?: string;
    name?: string;
    validFrom: string;
    validTo: string;
    deliveryFrom?: string;
    deliveryTo?: string;
    deliveryLength: number;
    benefits?: string | string[];
    priceVT?: number;
    priceNT?: number;
    priceGas?: number;
    mountlyPaymentPrice?: number;
    __typename?: string;
}


export interface ISupplyPointFindData {
    id: string;
    commodityType: string;
    name: string;
    supplier: ISupplier;
    ean: string;
    address: IAddress;
    distributionRate?: ICodelistItem;
    circuitBreaker?: ICodelistItem;
    annualConsumptionNT?: number;
    annualConsumptionVT?: number;
    expirationDate?: string;
    subject?: ICodelistItem;
    lastAnnualConsumptionNT?: number;
    lastAnnualConsumptionVT?: number;
}

export interface ISupplyPointFormData {
    id: number;
    supplierId: number;
    name: string;
    commodityType?: string;
    region: string;
    address: IAddress;
    ean?: string;
    circuitBreakerId?: string;
    distributionRateId?: string;
    annualConsumptionNT?: number;
    annualConsumptionVT?: number;
    eic?: string;
    annualConsumption?: number;
}
