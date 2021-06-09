import { LANDING_PAGE } from 'src/common/graphql/models/user.model';

export interface ILoginRequest {
    login: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    landingPage: LANDING_PAGE;
    error?: string; // from OAuth
    supplyPointId?: string; // from OAuth
}

export enum ILoginProvider {
    LOCAL = 'local',
    GOOGLE = 'google',
    FACEBOOK = 'facebook',
    BANK_ID = 'bankid',
}

export interface IJwtPayload {
    data: any;
    exp: number;
    firstName: string;
    lastName: string;
    lastSmsConfirmTs: number;
    manageOffers: boolean;
    manageOrders: boolean;
    manageUsers: boolean;
    provider?: ILoginProvider;
    role: any;
    sid: string;
    smsConfirmed: boolean;
    watchDogNotification: boolean;
    subjectId: number;
    subjectName: string;
    surname: string;
    token: string;
    uuid: string;
    username: string;
    email?: string;
    type?: IUserTypes;
    needSmsConfirm?: boolean;
    passwordReset?: boolean;
    userStatus: UserStatus;
    phoneNumber?: string;
    firstContract: boolean;
    evaluatedSupplyPoint: number;
}

export enum IUserTypes {
    'CONSUMER' = 'CONSUMER',
    'SUPPLIER' = 'SUPPLIER',
    'CONTRACT_IMPORTER' = 'CONTRACT_IMPORTER',
}

export enum IUserRoles {
    'ROLE_CONTRACT_IMPORTER' = 'CONTRACT_IMPORTER',
    'PARC_SUPPLIER_P4R' = 'PARC_SUPPLIER_P_4_R',
    'NEEDS_SMS_CONFIRMATION' = 'NEEDS_SMS_CONFIRMATION',
    'RESET_PASSWORD' = 'RESET_PASSWORD',
    'PARC_CONSUMER_P_4_R' = 'PARC_CONSUMER_P_4_R',
}

export enum UserStatus {
    'NEW' = 'NEW',
    'AWAITING_VERIFICATION' = 'AWAITING_VERIFICATION',
    'VERIFIED_BY_PAYMENT' = 'VERIFIED_BY_PAYMENT',
}
