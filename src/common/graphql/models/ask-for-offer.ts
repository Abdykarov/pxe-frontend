import { CONSTS } from 'src/app/app.constants';
import {
    IAddress,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from './supply.model';
import { IPagination } from './suppplier.model';
import {IPersonalData, IPersonalDataInputForm} from './personal-data.model';

export enum ContractUploadStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    PROCESSED = 'PROCESSED',
}

export const ContractUploadStatusUrl = {
    [CONSTS.PATHS.ASK_FOR_OFFER_NEW]: ContractUploadStatus.NEW,
    [CONSTS.PATHS.ASK_FOR_OFFER_IN_PROGRESS]: ContractUploadStatus.IN_PROGRESS,
    [CONSTS.PATHS.ASK_FOR_OFFER_PROCESSED]: ContractUploadStatus.PROCESSED,
};

export interface IAskForOfferFilter {
    statuses: [ContractUploadStatus];
    pagination: IPagination;
}

export interface IUploadFileResponse {
    id: string;
    fileName: string;
}

export interface ContractUploadResponse {
    createdAt: string;
    status: ContractUploadStatus;
    email: string;
    files: [IUploadFileResponse];
    id: number;
}

export interface IPaginatedAskForOffer {
    page: [ContractUploadResponse];
    totalRecords: number;
}

export interface ISupplyPointImportInput {
    address?: IAddress;
    contractEndTypeId?: string;
    expirationDate?: string;
    name?: string;
    supplyPointPowerAttributes?: ISupplyPointPowerAttributes;
    supplyPointGasAttributes?: ISupplyPointGasAttributes;
    subjectTypeId?: string;
    supplierId?: string;
    timeToContractEnd?: number;
    timeToContractEndPeriodId?: String;
    personalData?: IPersonalDataInputForm;
    importPricePerKwPowerVT?: number;
    importPricePerKwPowerNT?: number;
    importPricePerKwGas?: number;
    importPriceTotalPerYear?: number;
}

export interface ISupplyPointPowerAttributesImport {
    ean: string;
    circuitBreakerId: string;
    phasesId: string;
    distributionRateId: string;
    annualConsumptionNT: number;
    annualConsumptionVT: number;
}

export interface ISupplyPointGasAttributesImport {
    eic: string;
    annualConsumption: number;
}

export interface ISupplyPointImport {
    id: string;
    supplierId: string;
    name: string;
    address: IAddress;
    supplyPointPowerAttributes: ISupplyPointPowerAttributesImport;
    supplyPointGasAttributes: ISupplyPointGasAttributesImport;
    expirationDate: string;
    subjectTypeId: string;
    contractEndTypeId: string;
    timeToContractEnd: number;
    timeToContractEndPeriodId: string;
    personalData: IAddress;
    askForOfferId: string;
}
