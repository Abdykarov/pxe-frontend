import { IOption } from 'src/common/ui/forms/models/option.model';
import { IContract } from './contract';

export enum CommodityType {
    POWER = 'POWER',
    GAS = 'GAS',
}

export enum SubjectType {
    SUBJECT_TYPE_INDIVIDUAL = 'Domácnost',
    SUBJECT_TYPE_BUSINESSMAN = 'Firma',
}

export enum TimeToContractEndPeriod {
    DAY = 'Den',
    MONTH = 'Mesic',
}

export enum AllowedOperations {
    DELETE_CONTRACT = 'DELETE_CONTRACT',
    LEAVE_CONTRACT = 'LEAVE_CONTRACT',
    PARTIAL_EDIT = 'PARTIAL_EDIT',
    SHOW_DELIVERY_TO = 'SHOW_DELIVERY_TO',
    TERMINATE_CONTRACT = 'TERMINATE_CONTRACT',
    UNSET_AUTOMATIC_PROLONGATION = 'UNSET_AUTOMATIC_PROLONGATION',
    SHOW_DELIVERY_TO_INFINITE_PERIOD = 'SHOW_DELIVERY_TO_INFINITE_PERIOD',
    FINALIZE_NEXT_CONTRACT = 'FINALIZE_NEXT_CONTRACT',
    OPEN_NEXT_CONTRACT = 'OPEN_NEXT_CONTRACT',
    CREATE_FROM_HISTORY_CONTRACT = 'CREATE_FROM_HISTORY_CONTRACT',
    FINALIZE_FROM_HISTORY_CONTRACT = 'FINALIZE_FROM_HISTORY_CONTRACT',
    SHOW_CREATED_CONTRACT_FROM_HISTORY = 'SHOW_CREATED_CONTRACT_FROM_HISTORY',
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
    numberSeriesPrefix?: string;
    numberSeriesVariable?: string;
    numberSeriesSuffix?: string;
    __typename?: string;
}

export interface ISupplierSampleDocument {
    type: string;
    url: string;
    commodityType: CommodityType;
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
    withoutSupplier?: boolean;
}

export interface ISupplyPointGasAttributes {
    eic: string;
    annualConsumption: number;
    annualConsumptionUnit?: string;
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
    annualConsumptionNTUnit?: string;
    annualConsumptionVTUnit?: string;
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
    identificationNumber: string;
    address: IAddress;
    distributionRate: ICodelistItem;
    circuitBreaker: ICodelistItem;
    phases: ICodelistItem;
    annualConsumption?: number;
    annualConsumptionNT?: number;
    annualConsumptionVT?: number;
    expirationDate: string;
    subject: ICodelistItem;
    lastAnnualConsumption?: number;
    lastAnnualConsumptionNT?: number;
    lastAnnualConsumptionVT?: number;
    lastVersionOfSupplyPoint: boolean;
    contractEndType: ICodelistItem;
    timeToContractEnd: number;
    timeToContractEndPeriod: ICodelistItem;
    contract: IContract;
    progressStatus: ProgressStatus;
    annualConsumptionNTUnit?: string;
    annualConsumptionVTUnit?: string;
    annualConsumptionUnit?: string;
    importPricePerKwPowerVT?: number;
    importPricePerKwPowerNT?: number;
    importPricePerKwGas?: number;
    importPriceTotalPerYear?: number;
    importPermanentMonthlyPay?: number;
    imported?: boolean;
    withoutSupplier?: boolean;
    closedByContractEntityId: string;
    closedByContractIsConcluded: boolean;
}

export enum ProgressStatus {
    COMPLETED = 'COMPLETED',
    NONE = 'NONE',
    SIGNBOARD = 'SIGNBOARD', // Doesnot exist in BE, only for router. Theoretically it can be replaced by NONE.
    OFFER_STEP = 'OFFER_STEP',
    PERSONAL_DATA = 'PERSONAL_DATA',
    READY_FOR_SIGN = 'READY_FOR_SIGN',
    SUPPLY_POINT = 'SUPPLY_POINT',
    WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
    PRICES = 'PRICES',
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
    annualConsumptionNTUnit?: string;
    annualConsumptionVTUnit?: string;
    withoutSupplier?: string;
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
