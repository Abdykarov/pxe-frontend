import { CommodityType } from '../../../graphql/models/supply.model';

export interface IForm {
    controls: {
        [key: string]: any;
    };
    validationMessages: {
        [key: string]: {
            [key: string]: string;
        };
    };
}

export interface IFieldError {
    [key: string]: string[];
}

export enum SignUpType {
    NewsSubscription,
    SignUp,
}

export interface ICommodityTypeFields {
    [CommodityType.POWER]: string[];
    [CommodityType.GAS]: string[];
}

export interface IExpirationConfig {
    [key: string]: {
        expirationDate: boolean;
        timeToContractEnd: boolean;
        timeToContractEndPeriodId: boolean;
    };
}
