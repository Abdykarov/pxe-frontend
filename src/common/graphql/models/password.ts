export interface ILoginResponse {
    token: string;
    landingPage: LANDING_PAGE;
}

export interface IUserLogin {
    email: string;
    password: string;
}


export const RESET_PASSWORD_RESPONSE_EMAIL = 'EMAIL';
export const RESET_PASSWORD_RESPONSE_PHONE = 'PHONE';


export enum LANDING_PAGE {
    OFFERS = 'OFFERS',
    DASHBOARD = 'DASHBOARD',
    NEW_SUPPLY_POINT = 'NEW_SUPPLY_POINT',
}
