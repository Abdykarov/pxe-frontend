export interface ILoginResponse {
    token: string;
    landingPage: LANDING_PAGE;
    supplyPointId: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export enum PASSWORD_DESTINATION {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
}

export enum LANDING_PAGE {
    OFFERS = 'OFFERS',
    DASHBOARD = 'DASHBOARD',
    NEW_SUPPLY_POINT = 'NEW_SUPPLY_POINT',
    PAYMENT = 'PAYMENT', // TODO check real name
}
