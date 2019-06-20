import {
    ISelectedOffer,
    ISupplyPoint,
} from './supply.model';
import { IPersonalData } from './personal-data.model';

export interface IContract {
    contractId: number;
    contractStatus: string;
    deliveryFrom: string;
    deliveryTo: string;
    offer: ISelectedOffer;
    personalData: IPersonalData;
}

enum ContractStatus {
    CANCELED = 'CANCELED',
    NOT_CONCLUDED = 'NOT_CONCLUDED',
    CONCLUDED = 'CONCLUDED',
}
