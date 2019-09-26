import {
    CommodityType,
    DistributionType,
    SubjectType,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { IQRCodeSetting } from 'src/common/graphql/models/contract';

export const CONSTS = {
    ADULTHOOD_AGE: 18,
    CURRENCY: {
        DEFAULT: 'CZK',
    },
    DATE_FORMAT: {
        CALENDAR: 'YYYY-MM-DD[T]HH:mm',
        SHORT: 'YYYY-MM-DD',
    },
    DEFAULT_EXPIRATION: 3600,
    MAX_DAYS_TILL_CONTRACT_EXPIRATION: 60,
    MAX_LENGTH_WHOLE_NAME: 150,
    MAX_LENGTH_NAME: 50,
    MAX_LENGTH_POSITION: 80,
    MIN_BIRTH_DATE: '1900-01-01',
    MONTH_DURATION: 30,
    MONTHS_TO_CONTRACT_END: 2,
    OWN_TERMINATE_INIT_STATE_OF_SUPPLY_POINT: false,
    PATHS: {
        CONTRACT : 'contract',
        COOKIES_POLICY : 'cookies-policy',
        CHANGE_PASSWORD: 'change-password',
        DASHBOARD : 'dashboard',
        EMPTY : '',
        FORGOTTEN_PASSWORD : 'forgotten-password',
        GAS: 'gas',
        LOGIN : 'login',
        LOGOUT : 'logout',
        NOT_FOUND : '404',
        OFFER_SELECTION : 'offer-selection',
        PAYMENT : 'payment',
        POWER: 'power',
        RECAPITULATION : 'recapitulation',
        REQUEST : 'request',
        REQUESTS : 'requests',
        RESULT : 'result',
        SECURED : 'secured',
        SECURING_YOUR_DATA : 'securing-your-data',
        SIGN_UP : 'sign-up',
        SUPPLY_POINT : 'supply-point',
        SUPPLY_POINT_SELECTION : 'supply-point-selection',
        SUPPLY_POINTS : 'supply-points',
        SUPPLY_OFFER: 'supply-offer',
        TERMS_OF_USE : 'terms-of-use',
        USER_PROFILE: 'user-profile',
        WILD_CART  : '**',
    },
    TELEPHONE_PREFIX_CZ: '+420',
    TIME_TO_CONTRACT_END_PROLONGED: 14,
    REFRESH_INTERVAL_RXJS: 5000,
    REFRESH_INTERVAL_TOKEN: 180000,
};

export const ROUTES = {
    ROUTER_ROOT: '/',
    ROUTER_DASHBOARD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.DASHBOARD}`,
    ROUTER_REQUEST_SUPPLY_POINT_SELECTION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_POINT_SELECTION}`,
    ROUTER_REQUEST_CONTRACT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.CONTRACT}`,
    ROUTER_REQUEST_OFFER_SELECTION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.OFFER_SELECTION}`,
    ROUTER_REQUEST_PAYMENT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.PAYMENT}`,
    ROUTER_REQUEST_RECAPITULATION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.RECAPITULATION}`,
    ROUTER_REQUEST_SUPPLY_POINT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.SUPPLY_POINT}`,
    ROUTER_REQUEST_RESULT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.RESULT}`,
    ROUTER_REQUESTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUESTS}`,
    ROUTER_SECURING_YOUR_DATA: `/${CONSTS.PATHS.SECURING_YOUR_DATA}`,
    ROUTER_SUPPLY_POINTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_POINTS}`,
    ROUTER_SUPPLY_OFFER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}`,
    ROUTER_SUPPLY_OFFER_POWER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}/${CONSTS.PATHS.POWER}`,
    ROUTER_SUPPLY_OFFER_GAS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}/${CONSTS.PATHS.GAS}`,
    ROUTER_TERMS_OF_USE: `/${CONSTS.PATHS.TERMS_OF_USE}`,
    ROUTER_USER_CHANGE_PASSWORD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CHANGE_PASSWORD}`,
    ROUTER_USER_PROFILE: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.USER_PROFILE}`,
};

export const CODE_LIST = {
    DIST_RATE: 'DSTSAZ',
    DIST_RATE_COMPANY: 'DSTSA1',
    DIST_RATE_INDIVIDUAL: 'DSTSA2',
    CIRCUIT_BREAKER: 'JISTIC',
    CIRCUIT_BREAKER_PHASE: 'POCFAZ',
    CIRCUIT_BREAKER_SIZE: 'JISTA',
    CONTRACT_END_TYPE: 'KONSML',
    TIME_TO_CONTRACT_END_PERIOD: 'PERKON',
    SUBJECT: 'TPSB',
    COMMODITY: 'COMO',
    CONSUMPTION: 'CGAS',
    DISTRIBUTION_POWER: 'PDISTR',
    DISTRIBUTION_GAS: 'GDISTR',
    DEPOSIT_PAYMENT_TYPE: 'PAYTY2',
};

export const CODE_LIST_TYPES = [
    CODE_LIST.DIST_RATE,
    CODE_LIST.DIST_RATE_INDIVIDUAL,
    CODE_LIST.DIST_RATE_COMPANY,
    CODE_LIST.CIRCUIT_BREAKER,
    CODE_LIST.CONTRACT_END_TYPE,
    CODE_LIST.CIRCUIT_BREAKER_PHASE,
    CODE_LIST.CIRCUIT_BREAKER_SIZE,
    CODE_LIST.DEPOSIT_PAYMENT_TYPE,
    CODE_LIST.SUBJECT,
    CODE_LIST.COMMODITY,
    CODE_LIST.CONSUMPTION,
    CODE_LIST.DISTRIBUTION_POWER,
    CODE_LIST.DISTRIBUTION_GAS,
    CODE_LIST.TIME_TO_CONTRACT_END_PERIOD,
];

export const CONTRACT_END_TYPE = {
    CONTRACT_END_TERM: 'Urcita',
    CONTRACT_END_TERM_WITH_PROLONGATION: 'UrcitaProlong',
    CONTRACT_END_INDEFINITE_PERIOD: 'Neurcita',
    CONTRACT_END_TERMINATE: 'Vypoved',
    CONTRACT_END_DEFAULT: 'DEFAULT',
};

export const CONTRACT_END_TYPE_ORDER = [
    CONTRACT_END_TYPE.CONTRACT_END_TERM,
    CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION,
    CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD,
];

export const TIME_TO_CONTRACT_END_PERIOD_MAP = {
    [TimeToContractEndPeriod.DAY]: 'day',
    [TimeToContractEndPeriod.MONTH]: 'month',
};

export const SUBJECT_TYPE_TO_DIST_RATE_MAP = {
    [SubjectType.SUBJECT_TYPE_INDIVIDUAL]: CODE_LIST.DIST_RATE_INDIVIDUAL,
    [SubjectType.SUBJECT_TYPE_BUSINESSMAN]: CODE_LIST.DIST_RATE_COMPANY,
};

export const COMMODITY_TO_DISTRIBUTION_MAP = {
    [CommodityType.POWER]: CODE_LIST.DISTRIBUTION_POWER,
    [CommodityType.GAS]: CODE_LIST.DISTRIBUTION_GAS,
};

export const DISTRIBUTION_RATES_TYPE_DEFINITION = {
    [DistributionType.VT] : [
        'C01d', 'C02d', 'C03d', 'C60d', 'C61d', 'C62d', 'D01d', 'D02d',
    ],
    [DistributionType.BOTH] : [
        'C25d', 'C26d', 'C27d', 'C35d', 'C45d', 'C46d', 'C55d', 'C56d',
        'D25d', 'D26d', 'D27d', 'D35d', 'D45d', 'D56d', 'D57d', 'D61d',
    ],
};

export const SUBJECT_TYPE_OPTIONS: Array<IOption> = [
    {
        key: SubjectType.SUBJECT_TYPE_INDIVIDUAL,
        value: SubjectType.SUBJECT_TYPE_INDIVIDUAL,
        label: 'domácnost',
    },
    {
        key: SubjectType.SUBJECT_TYPE_BUSINESSMAN,
        value: SubjectType.SUBJECT_TYPE_BUSINESSMAN,
        label: 'firma',
    },
];

export const COMMODITY_TYPE_OPTIONS: Array<IOption> = [
    {
        key: CommodityType.POWER,
        label: 'elektřina',
    },
    {
        key: CommodityType.GAS,
        label: 'plyn',
    },
];

export const DELIVERY_LENGTH_OPTIONS: Array<IOption> = [
    {
        key: 1,
        value: 1,
        label: '1 rok',
    },
    {
        key: 2,
        value: 2,
        label: '2 roky',
    },
];

export const  ANNUAL_CONSUMPTION_OPTIONS = [
    {
        key: 1,
        value: '1',
        label: 'do 1,89 MWh',
    },
    {
        key: 2,
        value: '2',
        label: '1,89 - 7,56 MWh',
    },
    {
        key: 3,
        value: '3',
        label: '7,56 - 15 MWh',
    },
    {
        key: 4,
        value: '4',
        label: '15 - 25 MWh',
    },
    {
        key: 5,
        value: '5',
        label: '25 - 45 MWh',
    },
    {
        key: 6,
        value: '6',
        label: '45 - 63 MWh',
    },
];

export const SUPPLY_POINT_EDIT_TYPE = {
    NORMAL: 'NORMAL',
    PROLONG: 'PROLONG',
};

export const DEFAULT_QR_CODE_SETTING: IQRCodeSetting = {
    height: 256,
    width: 256,
    margin: 0,
};