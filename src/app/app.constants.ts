export const CONSTS = {
    DATE_FORMAT: {
        CALENDAR: 'YYYY-MM-DD[T]HH:mm',
        SHORT: 'YYYY-MM-DD',
    },
    CURRENCY: {
        DEFAULT: 'CZK',
    },
    DEFAULT_EXPIRATION: 3600,
    PATHS: {
        DASHBOARD : 'dashboard',
        COOKIES_POLICY : 'cookies-policy',
        EMPTY : '',
        FORGOTTEN_PASSWORD : 'forgotten-password',
        NOT_FOUND : '404',
        LOGIN : 'login',
        LOGOUT : 'logout',
        OFFER_SELECTION : 'offer-selection',
        SECURING_YOUR_DATA : 'securing-your-data',
        REQUEST : 'request',
        REQUESTS : 'requests',
        SECURED : 'secured',
        SIGN_UP : 'sign-up',
        SUPPLY_POINT : 'supply-point',
        SUPPLY_POINTS : 'supply-points',
        SUPPLY_OFFER: 'supply-offer',
        TERMS_OF_USE : 'terms-of-use',
        WILD_CART  : '**',
    },
};

export const ROUTES = {
    ROUTER_ROOT: '/',
    ROUTER_REQUEST: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}`,
    ROUTER_SUPPLY_POINTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_POINTS}`,
    ROUTER_SUPPLY_OFFER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}`,
    ROUTER_REQUEST_SUPPLY_POINT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.SUPPLY_POINT}`,
    ROUTER_REQUEST_OFFER_SELECTION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.OFFER_SELECTION}`,
    ROUTER_DASHBOARD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.DASHBOARD}`,
};
