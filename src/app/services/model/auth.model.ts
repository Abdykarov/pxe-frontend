export interface ILoginRequest {
    username: string;
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
    role: IUserRoles;
    sid: string;
    smsConfirmed: boolean;
    subjectId: number;
    subjectName: string;
    surname: string;
    token: string;
    username: string;
}

export enum IUserRoles {
    'PARC_MANAGER' = 'parc_manager',
    'PARC_SUPPLIER_P4R' = 'parc_supplier_p4r',
}
