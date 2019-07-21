export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
    expiresTime: number;
}

export interface IJwtPayload {
    data: any;
    exp: number;
    firstname: string;
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
}

export enum IUserRoles {
    'PARC_MANAGER' = 'PARC_MANAGER',
    'PARC_SUPPLIER_P4R' = 'PARC_SUPPLIER_P_4_R',
    'NEEDS_SMS_CONFIRMATION' = 'NEEDS_SMS_CONFIRMATION',
}

export enum UserStatus {
    'NEW' = 'NEW',
    'AWAITING_VERIFICATION' = 'AWAITING_VERIFICATION',
    'WAITING_FOR_PAYMENT' = 'WAITING_FOR_PAYMENT',
}
