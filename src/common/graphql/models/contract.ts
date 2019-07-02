import { IPersonalData } from './personal-data.model';
import { ISelectedOffer } from './supply.model';

export interface IContract {
    contractId?: string;
    contractStatus?: string;
    deliveryFrom?: string;
    deliveryTo?: string;
    offer?: ISelectedOffer;
    personalData?: IPersonalData;
    __typename?: string;
}

export enum ContractStatus {
    CANCELED = 'CANCELED',
    NOT_CONCLUDED = 'NOT_CONCLUDED',
    CONCLUDED = 'CONCLUDED',
}
