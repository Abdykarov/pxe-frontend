import { ISupplyPoint } from './supply.model';

export interface IContract {
    contractId: number;
    offer: number;
    supplyPoint: ISupplyPoint;
    contractStatus: string;
    deliveryFrom: string;
    deliveryTo: string;
}

enum ContractStatus {
    CANCELED = 'CANCELED',
    NOT_CONCLUDED = 'NOT_CONCLUDED',
    CONCLUDED = 'CONCLUDED',
}
