import {
    IAddress,
    ICodelistItem,
} from './supply.model';

export interface IPersonalDataInput {
    name: string;
    ico: string;
    dic: string;
    address1: IAddress;
    address2: IAddress;
    email: string;
    phone: string;
    bankAccountNumber: string;
    bankCode: string;
    depositPaymentTypeId: string;
    deposit: string;
}

export interface IPersonalData {
    name: string;
    ico: string;
    dic: string;
    address1: IAddress;
    address2: IAddress;
    email: string;
    phone: string;
    bankAccountNumber: string;
    bankCode: string;
    depositPaymentType: ICodelistItem;
    deposit: number;
}
