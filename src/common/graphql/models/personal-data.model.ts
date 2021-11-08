import { IAddress, ICodelistItem } from './supply.model';

export interface IPersonalDataInput {
    name: string;
    birthDate?: string;
    ico?: string;
    dic?: string;
    address1: IAddress;
    address2: IAddress;
    email: string;
    phone: string;
    bankAccountNumber: string;
    bankCode: string;
    depositPaymentTypeId: string;
    deposit: number;
    signatoryName?: string;
    signatorySurname?: string;
    signatoryPosition?: string;
}

export interface IPersonalDataInputForm {
    name?: string;
    birthDate?: string;
    ico?: string;
    dic?: string;
    address1?: IAddress;
    address2?: IAddress;
    email?: string;
    phone?: string;
    phonePrefix?: string;
    bankAccountNumber?: string;
    bankCode?: string;
    depositPaymentTypeId?: string;
    deposit?: number;
    onlyAddress1?: string;
    signatoryName?: string;
    signatorySurname?: string;
    signatoryPosition?: string;
}

export interface IPersonalData {
    name: string;
    birthDate?: string;
    ico?: string;
    dic?: string;
    address1: IAddress;
    address2: IAddress;
    email: string;
    phone: string;
    bankAccountNumber: string;
    bankCode: string;
    depositPaymentType: ICodelistItem;
    deposit: number;
    signatoryName?: string;
    signatorySurname?: string;
    signatoryPosition?: string;
    __typename?: string;
}
