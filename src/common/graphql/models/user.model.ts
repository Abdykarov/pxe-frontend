export interface IUserLogin {
    login: string;
    password: string;
}

export enum PASSWORD_DESTINATION {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
}

export enum LANDING_PAGE {
    ASK_FOR_OFFER = 'ASK_FOR_OFFER',
    OFFERS = 'OFFERS',
    DASHBOARD = 'DASHBOARD',
    NEW_SUPPLY_POINT = 'NEW_SUPPLY_POINT',
    WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
}


export interface IUserDetailInput {
    email?: string;
    firstName?: string;
    lastName?: string;
    passwordReset?: boolean;
    phoneNumber?: string;
    userName: string;
    smsCode?: string;
}
