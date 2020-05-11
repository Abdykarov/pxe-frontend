import { LANDING_PAGE } from 'src/common/graphql/models/user.model';

export interface ILoginRequest {
    login: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    landingPage: LANDING_PAGE;
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
    role: any;
    sid: string;
    smsConfirmed: boolean;
    subjectId: number;
    subjectName: string;
    surname: string;
    token: string;
    username: string;
    email?: string;
    supplier?: boolean;
    needSmsConfirm?: boolean;
    passwordReset?: boolean;
    userStatus: UserStatus;
    phoneNumber?: string;
    firstContract: boolean;
    evaluatedSupplyPoint: number;
    userLogin: string;
}

export enum IUserRoles {
    'PARC_MANAGER' = 'PARC_MANAGER',
    'PARC_SUPPLIER_P4R' = 'PARC_SUPPLIER_P_4_R',
    'NEEDS_SMS_CONFIRMATION' = 'NEEDS_SMS_CONFIRMATION',
    'RESET_PASSWORD' = 'RESET_PASSWORD',
}

export enum UserStatus {
    'NEW' = 'NEW',
    'AWAITING_VERIFICATION' = 'AWAITING_VERIFICATION',
    'VERIFIED_BY_PAYMENT' = 'VERIFIED_BY_PAYMENT',
}
