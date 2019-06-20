import {
    ISelectedOffer,
    ISupplyPoint,
} from './supply.model';
import { IPersonalData } from './personal-data.model';

export interface IContract {
    contractId?: string;
    contractStatus?: string;
    deliveryFrom?: string;
    deliveryTo?: string;
    offer?: ISelectedOffer;
    personalData?: IPersonalData;
    __typename?: string;
}

enum ContractStatus {
    CANCELED = 'CANCELED',
    NOT_CONCLUDED = 'NOT_CONCLUDED',
    CONCLUDED = 'CONCLUDED',
}
