import { IOffer } from 'src/common/graphql/models/offer.model';
import { IPersonalData } from './personal-data.model';

export interface IContract {
    contractId?: string;
    contractStatus?: string;
    deliveryFrom?: string;
    deliveryTo?: string;
    offer?: IOffer;
    nextContractId?: string;
    previousContractId?: string;
    isNextContractConcluded?: boolean;
    prolong?: boolean;
    personalData?: IPersonalData;
    offerValidity: Boolean;
    __typename?: string;
}

export enum ContractStatus {
    CANCELED = 'CANCELED',
    NOT_CONCLUDED = 'NOT_CONCLUDED',
    CONCLUDED = 'CONCLUDED',
    WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
    TO_BE_CANCELED = 'TO_BE_CANCELED',
    PREPARED_TO_PROLONGATION = 'PREPARED_TO_PROLONGATION',
}

export interface IPayment {
    accountNumber: IBankAccount;
    amount: number;
    currency: ICurrency;
    dueDate: string;
    encodedQrCode: string;
    msg: string;
    variableSymbol: IVariableSymbol;
}

export interface ICurrency {
    currencyCode: string;
}

export interface IQRCodeSetting {
    backgroundColor?: string;
    foregroundColor?: string;
    height?: number;
    width?: number;
    margin?: number;
}

export interface IBankAccount {
    accountNumber: string;
    accountPrefix?: string;
    bankCode: string;
    iban?: string;
}

export interface IVariableSymbol {
    value: string;
}

export enum ContractDeleteReason {
    LEAVING = 'LEAVING',
    TERMINATION = 'TERMINATION',
}
