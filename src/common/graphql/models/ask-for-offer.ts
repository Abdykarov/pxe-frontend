import { CONSTS } from 'src/app/app.constants';
import { IPagination } from './suppplier.model';
import {IAddress, ISupplyPointGasAttributes, ISupplyPointPowerAttributes} from './supply.model';

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
    askForOfferId: string;
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
