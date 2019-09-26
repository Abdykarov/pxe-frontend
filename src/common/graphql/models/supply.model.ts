import { IContract } from './contract';
import { IOption } from 'src/common/ui/forms/models/option.model';

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

export enum TimeToContractEndPeriod {
    DAY = 'Den',
    MONTH = 'Mesic',
}

export enum AllowedOperations {
    DELETE = 'DELETE',
    LEAVE_CONTRACT = 'LEAVE_CONTRACT',
    PARTIAL_EDIT = 'PARTIAL_EDIT',
    SHOW_DELIVERY_TO = 'SHOW_DELIVERY_TO',
    TERMINATE_CONTRACT = 'TERMINATE_CONTRACT',
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

export interface ICodelistOptions {
    [key: string]: ICodelistOption;
}

export interface ICodelistOption extends ICodelistItem, IOption {}

export interface ISupplier {
    id: string;
    name: string;
    vatNumber: string;
    logoPath?: string;
    sampleDocuments: ISupplierSampleDocument[];
    __typename?: string;
}

export interface ISupplierSampleDocument {
    type: string;
    url: string;
}

export interface ISupplyPointInput {
    address: IAddress;
    contractEndTypeId: string;
    expirationDate?: string;
    name: string;
    gasAttributes?: ISupplyPointGasAttributes;
    powerAttributes?: ISupplyPointPowerAttributes;
    subjectTypeId: string;
    supplierId: number;
    timeToContractEnd?: number;
    timeToContractEndPeriodId?: String;
    ownTerminate?: boolean;
}

export interface ISupplyPointGasAttributes {
    eic: string;
    annualConsumption: number;
}

export interface ISupplyPointUpdateGasAttributes {
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

export interface ISupplyPointUpdatePowerAttributes {
    annualConsumptionNT: number;
    annualConsumptionVT: number;
}

export interface ISupplyPoint {
    id: string;
    name: string;
    allowedOperations: AllowedOperations[];
    commodityType: CommodityType;
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
    lastVersionOfSupplyPoint: boolean;
    contractEndType: ICodelistItem;
    timeToContractEnd: number;
    timeToContractEndPeriod: ICodelistItem;
    contract: IContract;
    progressStatus: ProgressStatus;
}

export enum ProgressStatus {
    COMPLETED = 'COMPLETED',
    NONE = 'NONE',
    OFFER_STEP = 'OFFER_STEP',
    PERSONAL_DATA = 'PERSONAL_DATA',
    READY_FOR_SIGN = 'READY_FOR_SIGN',
    SUPPLY_POINT = 'SUPPLY_POINT',
    WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
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
    accountingRegulatedPrice: number;
    consumptionPriceNT: number;
    consumptionPriceVT: number;
    distributionPriceByCapacity: number;
    distributionPriceByConsumptionNT: number;
    distributionPriceByConsumptionVT: number;
    energyTaxRegulatedPrice: number;
    marketOrganizerRegulatedPrice: number;
    monthlyConsumptionFee: number;
    renewableEnergyRegulatedPrice: number;
    systemServicesRegulatedPrice: number;
    totalPrice: number;
    unit: string;
    prepayment: number;
    __typename?: string;
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

export interface ISupplyPointStatistic {
    concludedCount: number;
    concludedItems: ISupplyPointStatisticView[];
    gasAnnualConsumptionSum: number;
    gasCount: number;
    notConcludedCount: number;
    notConcludedItems: ISupplyPointStatisticView[];
    powerAnnualConsumptionSum: number;
    powerCount: number;
    showDeliveryCount: number;
    showDeliveryItems: ISupplyPointStatisticView[];
}

export interface ISupplyPointStatisticView {
    id: number;
    name: string;
    commodityType: CommodityType;
    progressStatus: ProgressStatus;
}