import { CONSTS } from 'src/app/app.constants';
import { IPagination } from './suppplier.model';

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

