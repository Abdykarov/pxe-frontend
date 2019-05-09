export const CONSTS = {
    DATE_FORMAT: {
        CALENDAR: 'YYYY-MM-DD[T]HH:mm',
        SHORT: 'YYYY-MM-DD',
    },
    CURRENCY: {
        DEFAULT: 'CZK',
    },
    PATHS: {
        EMPTY : '',
        ROOT : '/',
        WILD_CART  : '**',
        ERROR_PAGE : '404',
        SECURED : 'secured',
        COOKIES_POLICY : 'cookies-policy',
        LOGIN : 'login',
        LOGOUT : 'logout',
        FORGOTTEN_PASSWORD : 'forgotten-password',
        SECURING_YOUR_DATA : 'securing-your-data',
        TERMS_OF_USE : 'terms-of-use',
        SIGN_UP : 'sign-up',
        DASHBOARD : 'dashboard',
        REQUEST : 'request',
        SUPPLY_POINT : 'supply-point',
        SUPPLY_POINT_REQUEST : 'supply-point',
        OFFER_SELECTION : 'offer-selection',
    },
    get getAllPaths() {
        return CONSTS.PATHS;
    },
};

export const ROUTES = {
    ROUTER_SECURED_REQUEST_SUPPLY_POINT:
        `/${CONSTS.getAllPaths.SECURED}/${CONSTS.getAllPaths.REQUEST}/${CONSTS.getAllPaths.SUPPLY_POINT_REQUEST}`,
    ROUTER_SECURED_REQUEST_OFFER_SELECTION:
        `/${CONSTS.getAllPaths.SECURED}/${CONSTS.getAllPaths.REQUEST}/${CONSTS.getAllPaths.OFFER_SELECTION}`,
    ROUTER_SECURED_DASHBOARD:
        `/${CONSTS.getAllPaths.SECURED}/${CONSTS.getAllPaths.DASHBOARD}`,
};
