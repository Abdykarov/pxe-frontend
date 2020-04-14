import {
    CommodityType,
    SubjectType,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import { IOption } from 'src/common/ui/forms/models/option.model';
import { IQRCodeSetting } from 'src/common/graphql/models/contract';

export const CONSTS = {
    ALLOWED_TYPE_OF_IMPORT_OFFERS_FILES: ['csv'],
    CONTRACT_SIGN_NUMBER_OF_RETRY: 3,
    CURRENCY: {
        DEFAULT: 'CZK',
    },
    DATE_FORMAT: {
        CALENDAR: 'YYYY-MM-DD[T]HH:mm',
        SHORT: 'YYYY-MM-DD',
    },
    DEFAULT_EXPIRATION: 700000,
    DEFAULT_DEPOSIT_PAYMENT_TYPE_ID: 'Prikaz',
    EXPORT: {
        FILE_NAME: 'export',
        TYPE: 'csv',
    },
    EXAMPLE_OF_IMPORT_OFFER_FILE: {
        PATH: '/assets/csv/example-import-offers.csv',
        FILE_NAME: 'example_import_offers.csv',
    },
    IMPORT_ERROR_CODES: {
        FILE_TYPE: 'FILE_TYPE',
        MAX_NUMBER_OF_FILES: 'MAX_NUMBER_OF_FILES',
        NO_OFFERS_IN_IMPORT: 'NO_OFFERS_IN_IMPORT',
    },
    INTERVAL_RXJS: 5000,
    LOGIN_FORM_NAME: 'login',
    MAX_REQUEST_IN_BATCH_LINK: 200,
    MONTH_DURATION: 30,
    MONTHS_TO_CONTRACT_END: 2,
    OWN_TERMINATE_INIT_STATE_OF_SUPPLY_POINT: false,
    MODAL_TYPE: {
        CONFIRM_DELETE_OFFER: 'confirmDeleteOffer',
        CONFIRM_CANCEL_OFFER: 'confirmCancelOffer',
        CONFIRM_BACK_IMPORT: 'confirmBackImportOffer',
        CONFIRM_DELETE_MARKED: 'confirmDeleteMarked',
    },
    PATHS: {
        APPROVAL: 'approval',
        CONTRACT : 'contract',
        COOKIES_POLICY : 'cookies-policy',
        CHANGE_PASSWORD: 'change-password',
        DASHBOARD : 'dashboard',
        DELETE_ACCOUNT: 'delete-account',
        DELETED_ACCOUNT: 'deleted-account',
        EMPTY : '',
        IMPORT : 'import',
        FORGOTTEN_PASSWORD : 'forgotten-password',
        GAS: 'gas',
        LOGIN : 'login',
        LOGOUT : 'logout',
        OFFER_SELECTION : 'offer-selection',
        PATTERNS_OF_CONTRACTS: 'patterns-of-contracts',
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
        SUPPLIER_CONCLUDED_CONTRACTS: 'concluded-contracts',
        TERMS_OF_USE : 'terms-of-use',
        UPLOAD: 'upload',
        USER_PROFILE: 'user-profile',
        WILD_CART  : '**',
    },
    REFRESH_TOKEN: {
        INTERVAL: 300000,
        COUNT: 16,
        DONT_REFRESH_TIME_IN_MINUTES: 2,
    },
    VALIDATORS: {
        ADULTHOOD_AGE: 18,
        MAX_DIGIT_BEFORE_DECIMAL_POINT_ANNUAL_CONSUMPTION: 10,
        MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT: 7,
        MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT: 2,
        MAX_DIGIT_AFTER_DECIMAL_POINT_ANNUAL_CONSUMPTION: 3,
        MAX_LENGTH: {
            NUMBER_INPUT_WITH_HINT: 10,
            BENEFIT_NAME: 100,
            BENEFIT_URL: 5000,
            CITY: 255,
            DIC: 12,
            DESCRIPTIVE_NUMBER: 16,
            EMAIL_LOGIN: 40,
            EMAIL_RECAPITULATION: 50,
            OFFER_NAME: 50,
            ORIENTATION_NUMBER: 16,
            PASSWORD: 50,
            POSITION: 80,
            RECAPITULATION_NAME: 150,
            STREET: 255,
            USER_NAME_LOGIN: 28,
            USER_PROFILE_NAME: 50,
            SMS_CODE: 10,
        },
        MAX_IMPORT_FILES: 1,
        MIN_BIRTH_DATE: '1900-01-01',
        MIN_LENGTH: {
            DIC: 10,
            PASSWORD: 10,
        },
        ICO_LENGTH: 8,
        TIME_TO_CONTRACT_END_MIN: 0,
        TIME_TO_CONTRACT_END_MAX: 100,
    },
    TELEPHONE_PREFIX_CZ: '+420',
    TIME_TO_CONTRACT_END_PROLONGED: 30,
    TITLES: {
        COOKIES_POLICY: 'Cookies policy | PARC4U',
        DEFAULT: 'PARC4U',
        LANDING_PAGE: 'Získejte svobodu nad energií | PARC4U',
        LOGIN: 'Přihlášení | PARC4U',
        PATTERNS_OF_CONTRACTS: 'Vzory smluv o dodávce | PARC4U',
        TERMS_OF_USE: 'Podmínky užívání | PARC4U',
        SECURING_YOUR_DATA: 'Ochrana osobních údajů | PARC4U',
        SIGN_UP: 'Registrace | PARC4U',
    },
};

export const ROUTES = {
    ROUTER_ROOT: '/',
    ROUTER_DASHBOARD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.DASHBOARD}`,
    ROUTER_DELETE_ACCOUNT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.DELETE_ACCOUNT}`,
    ROUTER_IMPORT_UPLOAD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.IMPORT}/${CONSTS.PATHS.UPLOAD}`,
    ROUTER_LOGIN: `/${CONSTS.PATHS.LOGIN}`,
    ROUTER_REQUEST_SUPPLY_POINT_SELECTION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_POINT_SELECTION}`,
    ROUTER_REQUEST_CONTRACT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.CONTRACT}`,
    ROUTER_REQUEST_OFFER_SELECTION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.OFFER_SELECTION}`,
    ROUTER_REQUEST_PAYMENT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.PAYMENT}`,
    ROUTER_REQUEST_RECAPITULATION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.RECAPITULATION}`,
    ROUTER_REQUEST_SUPPLY_POINT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.SUPPLY_POINT}`,
    ROUTER_REQUEST_RESULT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.RESULT}`,
    ROUTER_REQUESTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUESTS}`,
    ROUTER_SECURING_YOUR_DATA: `/${CONSTS.PATHS.SECURING_YOUR_DATA}`,
    ROUTER_SUPPLIER_CONCLUDED_CONTRACTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS}`,
    ROUTER_SIGN_UP: `/${CONSTS.PATHS.SIGN_UP}`,
    ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_POWER:
        `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS}/${CONSTS.PATHS.POWER}`,
    ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_GAS:
        `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS}/${CONSTS.PATHS.GAS}`,
    ROUTER_SUPPLY_POINTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_POINTS}`,
    ROUTER_SUPPLY_OFFER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}`,
    ROUTER_SUPPLY_OFFER_POWER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}/${CONSTS.PATHS.POWER}`,
    ROUTER_SUPPLY_OFFER_GAS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}/${CONSTS.PATHS.GAS}`,
    ROUTER_IMPORT_APPROVAL_POWER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.IMPORT}/${CONSTS.PATHS.APPROVAL}/${CONSTS.PATHS.POWER}`,
    ROUTER_IMPORT_APPROVAL_GAS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.IMPORT}/${CONSTS.PATHS.APPROVAL}/${CONSTS.PATHS.GAS}`,
    ROUTER_TERMS_OF_USE: `/${CONSTS.PATHS.TERMS_OF_USE}`,
    ROUTER_USER_CHANGE_PASSWORD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CHANGE_PASSWORD}`,
    ROUTER_USER_PROFILE: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.USER_PROFILE}`,
};

export const SEO = {
    META_KEYWORDS: {
        COOKIES_POLICY: [
            'funkční cookies',
            'trvalé cookies',
            'informace',
        ],
        LANDING_PAGE: [
            'elektřina',
            'plyn',
            'dodavatel',
            'dodavateli',
            'nabídka',
            'komoditní burza',
            'odběrné místo',
            'změna dodavatele',
            'cena plynu',
            'cena elektřiny',
            'cena za kwh',
            'nejlevnějši elektřina',
            'nejlevnějši plyn',
            'distribuce plynu',
            'distribuce elektřiny',
            'parc4u',
            'pxe',
        ],
        LOGIN: [
            'přihlášení',
            'kliknutí',
        ],
        PATTERNS_OF_CONTRACTS: [
            'komodita',
            'nabídka',
        ],
        TERMS_OF_USE: [
            'obchodní podmínky',
            'PARC4U',
        ],
        SECURING_YOUR_DATA: [
            'chráníme',
            'zpracování údajů',
        ],
        SIGN_UP: [
            'registrace',
            'kliknutí',
            'obchodními podmínkami',
        ],
    },
    META_DESCRIPTION: {
        COOKIES_POLICY: 'Co jsou cookies a proč je na stránkách PARC4U používáme?',
        LANDING_PAGE: 'Měňte dodavatele energií na 1 klik. Neřešte papírování a chození na' +
            ' pobočky. Chraňte se před nekalostmi ve smlouvě. Energie za férové ceny bez skrytých poplatků.',
        LOGIN: 'Přihlášení do PARC4U, kde máte snadný přístup k jiným cenám za energie.',
        PATTERNS_OF_CONTRACTS: 'Vzor smlouvy k dodávce uzavřené přes PARC4U.',
        TERMS_OF_USE: 'Obchodní podmínky k pravidlům registrace dodavatelů a odběratelů na trhu PARC4U.',
        SECURING_YOUR_DATA: 'Jak v PARC4U pracujeme s osobními údaji a jak je chráníme.',
        SIGN_UP: 'Registrace do PARC4U, kde kliknutím měníte dodavatele energií,' +
            ' nemusíte na pobočky a dostáváte konečné ceny bez skrytých poplatků.',
    },
};

export enum INavigationItemType {
    NORMAL,
    ONLY_LABEL,
}

export const CODE_LIST = {
    ANNUAL_CONSUMPTION_UNITS: 'UNITS',
    DIST_RATE: 'DSTP4R',
    DIST_RATE_COMPANY: 'DSTSA1',
    DIST_RATE_INDIVIDUAL: 'DSTSA2',
    CIRCUIT_BREAKER: 'JISP4R',
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
    DISTRIBUTION_RATE_VT: 'DS1P4R',
    DISTRIBUTION_RATE_BOTH: 'DS2P4R',
};

export const CODE_LIST_TYPES = [
    CODE_LIST.ANNUAL_CONSUMPTION_UNITS,
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
    CODE_LIST.DISTRIBUTION_RATE_VT,
    CODE_LIST.DISTRIBUTION_RATE_BOTH,
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

export const CONTRACT_END_TYPE_TRANSLATE_MAP  = {
    [CONTRACT_END_TYPE.CONTRACT_END_TERM]: 'Smlouva na dobu určitou',
    [CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION]: 'Smlouva na dobu určitou s automatickou prolongací',
    [CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD]: 'Smlouva na dobu neurčitou',
    [CONTRACT_END_TYPE.CONTRACT_END_TERMINATE]: 'Vlastní výpověď',
};

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

export enum CommodityTypesLowerCase {
    POWER = 'power',
    GAS = 'gas',
}

export const commodityTypes = {
    [CommodityTypesLowerCase.POWER]: CommodityType.POWER,
    [CommodityTypesLowerCase.GAS]: CommodityType.GAS,
};

export enum SubjectTypeLowerCase {
    INDIVIDUAL = 'individual',
    BUSINESSMAN = 'business',
}

export const SubjectTypesTypes = {
    [SubjectTypeLowerCase.INDIVIDUAL]: SubjectType.SUBJECT_TYPE_INDIVIDUAL,
    [SubjectTypeLowerCase.BUSINESSMAN]: SubjectType.SUBJECT_TYPE_BUSINESSMAN,
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

export const S_ANALYTICS = {
    ACTIONS: {
        SIGN_UP: 'SIGN_UP',
        CREATE_SUPPLY_POINT: 'CREATE_SUPPLY_POINT',
        CHOOSE_OFFER: 'CHOOSE_OFFER',
        RECAPITULATION: 'RECAPITULATION',
    },
};

export const SUPPLY_POINT_EDIT_TYPE = {
    NORMAL: 'NORMAL',
    PROLONG: 'PROLONG',
};

export const DEFAULT_QR_CODE_SETTING: IQRCodeSetting = {
    height: 256,
    width: 256,
    margin: 0,
};

export enum UNIT_OF_PRICES {
    MWH = 'MWh',
    KWH = 'kWh',
}

export const REGIONS: Array<IOption> = [
    {
        'label': 'Hlavní město Praha',
        'value': 'Hlavní město Praha',
        'key': 'Hlavní město Praha',
    },
    {
        'label': 'Jihočeský kraj',
        'value': 'Jihočeský kraj',
        'key': 'Jihočeský kraj',
    },
    {
        'label': 'Jihomoravský kraj',
        'value': 'Jihomoravský kraj',
        'key': 'Jihomoravský kraj',
    },
    {
        'label': 'Karlovarský kraj',
        'value': 'Karlovarský kraj',
        'key': 'Karlovarský kraj',
    },
    {
        'label': 'Královéhradecký kraj',
        'value': 'Královéhradecký kraj',
        'key': 'Královéhradecký kraj',
    },
    {
        'label': 'Liberecký kraj',
        'value': 'Liberecký kraj',
        'key': 'Liberecký kraj',
    },
    {
        'label': 'Moravskoslezský kraj',
        'value': 'Moravskoslezský kraj',
        'key': 'Moravskoslezský kraj',
    },
    {
        'label': 'Olomoucký kraj',
        'value': 'Olomoucký kraj',
        'key': 'Olomoucký kraj',
    },
    {
        'label': 'Pardubický kraj',
        'value': 'Pardubický kraj',
        'key': 'Pardubický kraj',
    },
    {
        'label': 'Plzeňský kraj',
        'value': 'Plzeňský kraj',
        'key': 'Plzeňský kraj',
    },
    {
        'label': 'Středočeský kraj',
        'value': 'Středočeský kraj',
        'key': 'Středočeský kraj',
    },
    {
        'label': 'Ústecký kraj',
        'value': 'Ústecký kraj',
        'key': 'Ústecký kraj',
    },
    {
        'label': 'Kraj Vysočina',
        'value': 'Kraj Vysočina',
        'key': 'Kraj Vysočina',
    },
    {
        'label': 'Zlínský kraj',
        'value': 'Zlínský kraj',
        'key': 'Zlínský kraj',
    },
];

export const OPERATIONS_WITHOUT_SCROLL_ON_ERRORS = [
    'getSupplyPointGlobalStatistics',
    'makeRegistration',
    'savePowerOffer',
    'saveGasOffer',
    'sendChangePhoneNumberSmsMutation',
];

export enum RequestsOverviewBannerShow {
    NONE = 'NONE',
    TERMINATE_CONTRACT = 'TERMINATE_CONTRACT',
    LEAVE_CONTRACT = 'LEAVE_CONTRACT',
}
export const FILE_UPLOAD_CONFIG = 'file_upload_config';

export enum ANNUAL_CONSUMPTION_TYPES {
    ANNUAL_CONSUMPTION_NT = 'annualConsumptionNT',
    ANNUAL_CONSUMPTION_VT = 'annualConsumptionVT',
}

export enum ANNUAL_CONSUMPTION_UNIT_TYPES {
    ANNUAL_CONSUMPTION_NT_UNIT = 'annualConsumptionNTUnit',
    ANNUAL_CONSUMPTION_VT_UNIT = 'annualConsumptionVTUnit',
}
