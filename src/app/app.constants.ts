import { IExternalResource } from 'src/app/services/model/widget.model';
import { IQRCodeSetting } from 'src/common/graphql/models/contract';
import {
    CommodityType,
    SubjectType,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const CONSTS = {
    ALL_BLOG: 'vse',
    ANGULAR_UNIVERSAR_STATE_KEY_PREFIX: 'http_request:',
    APOLLO_CMS_KEY: 'cms',
    APPEND_AFTER_CUT_TEXT: '...',
    ALLOWED_TYPE_OF_IMPORT_OFFERS_FILES: ['csv'],
    ASK_FOR_OFFER: {
        ALLOWED_MINE_TYPE: [
            'image/bmp',
            'application/bmp',
            'image/jpg',
            'image/jpeg',
            'application/pdf',
            'image/png',
            'application/png',
            'image/tiff',
            'application/wps-office.pdf',
        ],
        ERROR_CODES: {
            FILE_TYPE: 'FILE_TYPE',
            FILE_COUNT: 'FILE_COUNT',
            FILE_SIZE: 'FILE_SIZE',
        },
        MAX_FILE_COUNT: 10,
        MAX_FILE_SIZE: 10485760,
        MANUALLY_ADD_EMAIL: 'user@email.com',
    },
    ARTICLE_PAGE_SIZE: 9,
    CMS: {
        REFRESH_TOKEN_URL: 'identity-server/connect/token',
        REGEX_CONTAIN_CMS: 'pxe-parc4u/graphql',
        REGEX_CONTAIN_CMS_DIRECT: 'content/pxe-parc4u/graphql',
    },
    CONTRACT_SIGN_NUMBER_OF_RETRY: 3,
    CURRENCY: {
        DEFAULT: 'CZK',
    },
    DATE_FORMAT: {
        CALENDAR: 'YYYY-MM-DD[T]HH:mm',
        SHORT: 'YYYY-MM-DD',
    },
    COOKIE_TEMPORARY_EXPIRATION: 10000,
    DEFAULT_EXPIRATION: 600100,
    DEFAULT_DEPOSIT_PAYMENT_TYPE_ID: 'Prikaz',
    EXPORT: {
        FILE_NAME: 'export',
        TYPE: 'csv',
    },
    EXAMPLE_OF_IMPORT_OFFER_FILE: {
        PATH: '/assets/csv/vzorovy_soubor_nabidky.csv',
        FILE_NAME: 'vzrorovy_soubor_nabidky.csv',
    },
    IMPORT_ERROR_CODES: {
        FILE_TYPE: 'FILE_TYPE',
        MAX_NUMBER_OF_FILES: 'MAX_NUMBER_OF_FILES',
        NO_OFFERS_IN_IMPORT: 'NO_OFFERS_IN_IMPORT',
    },
    INTERVAL_RXJS: 5000,
    IS_LAST_UPDATED_OFFER: 'is-last-updated-offer',
    LOCAL_STORAGE: {
        PERSONAL_INFO_PARTIAL_FORM_PREFIX: 'PERSONAL_INFO_',
        SUPPLY_POINT_PARTIAL_FORM: 'SUPPLY_POINT',
    },
    LOGIN_FORM_NAME: 'login',
    MAX_LENGTH_SUPPLIER_DESCRIPTION: 100,
    MAX_LENGTH_BLOG_DESCRIPTION: 100,
    MAX_REQUEST_IN_BATCH_LINK: 200,
    MONTH_DURATION: 30,
    MONTHS_TO_CONTRACT_END: 2,
    NAME_OF_PRE_RENDERED_FILES: 'data.json',
    OWN_TERMINATE_INIT_STATE_OF_SUPPLY_POINT: false,
    MODAL_TYPE: {
        CONFIRM_INFO_DELETE_ASK_FOR_OFFER: 'confirmAskForOfferOffer',
        CONFIRM_INFO_OFFER: 'confirmInfoOffer',
        CONFIRM_INFO_SUPPLY_POINT_IMPORT_ADDED:
            'confirmInfoSupplyPointImportAdded',
        CONFIRM_DELETE_ASK_FOR_OFFER: 'confirmDeleteAskForOffer',
        CONFIRM_DELETE_SUPPLY_POINT_IMPORT: 'confirmSupplyPointImport',
        CONFIRM_DELETE_REQUEST: 'confirmDeleteOffer',
        CONFIRM_DELETE_OFFER: 'confirmDeleteOffer',
        CONFIRM_CANCEL_OFFER: 'confirmCancelOffer',
        CONFIRM_BACK_IMPORT: 'confirmBackImportOffer',
        CONFIRM_DELETE_MARKED: 'confirmDeleteMarked',
        LP_VIDEO: 'lpVideo',
        MORE_TABS: 'moreTabs',
    },
    OFFSET_ERRORS: {
        INVALID_INPUT: 40,
        ALERT_DANGER: 50,
    },
    BOHEMIA_ENERGY_VAT_NUMBER: '27386732',
    PATHS: {
        APPROVAL: 'schvaleni',
        ASK_FOR_OFFER: 'nahrane-faktury',
        ASK_FOR_OFFER_NEW: 'prijate',
        ASK_FOR_OFFER_IN_PROGRESS: 'rozpracovane',
        ASK_FOR_OFFER_PROCESSED: 'uzavrene',
        BLOG: 'blog',
        CREATE_USER: 'vytvoreni-odberatele',
        CONTRACT: 'smlouva',
        COOKIES_POLICY: 'zasady-pouzivani-cookies',
        CHANGE_PASSWORD: 'zmena-hesla',
        DASHBOARD: 'nastenka',
        DELETE_ACCOUNT: 'smazani-uctu',
        DELETED_ACCOUNT: 'ucet-smazan',
        EMPTY: '',
        IMPORT: 'import',
        GAS: 'plyn',
        FAQ: 'casto-kladene-otazky',
        FORGOTTEN_PASSWORD: 'zapomenute-heslo',
        GENERATE_DATA: 'generate-data',
        LOGIN: 'prihlaseni',
        LOGOUT: 'odhlaseni',
        NOT_FOUND: 'stranka-nenalezena',
        O_AUTH: 'o-auth',
        OFFER_SELECTION: 'vyber-nabidky',
        PATTERNS_OF_CONTRACTS: 'vzory-smluv',
        PAYMENT: 'platba',
        PRICES: 'ceny',
        POWER: 'elektrina',
        RECAPITULATION: 'rekapitulace',
        REQUEST: 'rozpracovana-smlouva',
        REQUESTS: 'rozpracovane-smlouvy',
        RESULT: 'vysledek',
        SECURED: 'aplikace',
        SECURING_YOUR_DATA: 'ochrana-osobnich-udaju',
        SIGNBOARD: 'informace',
        SIGN_UP: 'registrace',
        SUPPLY_POINT: 'odberne-misto',
        SUPPLY_POINTS: 'uzavrene-smlouvy',
        SUPPLY_OFFER: 'sprava-nabidek',
        SUPPLIER_CONCLUDED_CONTRACTS: 'uzavrene-smlouvy-dodavatel',
        TERMS_OF_USE: 'podminky-uzivani',
        UNSUBSCRIBE_NEWS: 'odhlaseni-z-odberu',
        UPLOAD: 'nahrani',
        USER_PROFILE: 'uzivatelsky-profil',
        SUPPLIER_PROFILE: 'dodavatelsky-profil',
        WILD_CART: '**',
    },
    REFRESH_TOKEN: {
        INTERVAL: 300000,
        COUNT: 16,
        DONT_REFRESH_TIME_IN_MINUTES: 2,
    },
    START_STICKER_HEADER: 0,
    STORAGE_HELPERS: {
        LAST_URL: 'last_url',
        ACTIVE_TAB: 'active_tab',
        USER: 'user',
        REASON_FOR_LOGOUT_USER: 'reason_for_logout_user',
    },
    REASON_FOR_LOGOUT_USER: {
        BY_SELF: 'Byl jste ??sp????n?? odhl????en.',
        UNAUTHORIZED: 'Do??lo k odhl????en?? z d??vodu neaktivity.',
    },
    TIME_TO_SHOW_FLASH_MESSAGES: 3000,
    TIME_TO_SHOW_USER_LOGOUT_BANNER: 300,
    VALIDATORS: {
        ADULTHOOD_AGE: 18,
        MAX_ANNUAL_CONSUMPTION_IN_MWH: 63,
        MAX_DIGIT_BEFORE_DECIMAL_POINT_ANNUAL_CONSUMPTION: 10,
        MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT: 7,
        MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT: 2,
        MAX_DIGIT_AFTER_DECIMAL_POINT_ANNUAL_CONSUMPTION: 3,
        MAX_LENGTH: {
            URL_PRICES: 512,
            SUPPLIER_PROFILE_SERIES: 10,
            SUPPLIER_PROFILE_NUMBER_SERIES: 15,
            COMPANY_NAME: 150,
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
    TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS: 30,
    TIME_TO_CONTRACT_END_INDEFINITE_TIME_IN_MONTHS: 3,
    TITLES: {
        DEFAULT: 'parc4u',
    },
    LG_RESOLUTION: 1366,
    XL_RESOLUTION: 992,
    MD_RESOLUTION: 768,
    SM_RESOLUTION: 576,
};

export const ROUTES = {
    ROUTER_ROOT: '/',
    ROUTER_ASK_FOR_OFFER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.ASK_FOR_OFFER}`,
    ROUTER_ASK_FOR_OFFER_NEW: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.ASK_FOR_OFFER}/${CONSTS.PATHS.ASK_FOR_OFFER_NEW}`,
    ROUTER_ASK_FOR_OFFER_IN_PROGRESS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.ASK_FOR_OFFER}/${CONSTS.PATHS.ASK_FOR_OFFER_IN_PROGRESS}`,
    ROUTER_ASK_FOR_OFFER_PROCESSED: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.ASK_FOR_OFFER}/${CONSTS.PATHS.ASK_FOR_OFFER_PROCESSED}`,
    ROUTER_BLOG: `/${CONSTS.PATHS.BLOG}`,
    ROUTER_CREATE_USER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CREATE_USER}`,
    ROUTER_CREATE_USER_SUPPLY_POINT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CREATE_USER}/${CONSTS.PATHS.SUPPLY_POINT}`,
    ROUTER_CREATE_USER_RECAPITULATION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CREATE_USER}/${CONSTS.PATHS.RECAPITULATION}`,
    ROUTER_CREATE_USER_PRICES: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CREATE_USER}/${CONSTS.PATHS.PRICES}`,
    ROUTER_DASHBOARD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.DASHBOARD}`,
    ROUTER_DELETE_ACCOUNT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.DELETE_ACCOUNT}`,
    ROUTER_IMPORT_UPLOAD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.IMPORT}/${CONSTS.PATHS.UPLOAD}`,
    ROUTER_LOGIN: `/${CONSTS.PATHS.LOGIN}`,
    ROUTER_REQUEST_CONTRACT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.CONTRACT}`,
    ROUTER_REQUEST_OFFER_SELECTION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.OFFER_SELECTION}`,
    ROUTER_REQUEST_PAYMENT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.PAYMENT}`,
    ROUTER_REQUEST_RECAPITULATION: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.RECAPITULATION}`,
    ROUTER_REQUEST_SIGNBOARD: `/${CONSTS.PATHS.SECURED}//${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.SIGNBOARD}`,
    ROUTER_REQUEST_SUPPLY_POINT: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUEST}/${CONSTS.PATHS.SUPPLY_POINT}`,
    ROUTER_REQUESTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.REQUESTS}`,
    ROUTER_SECURING_YOUR_DATA: `/${CONSTS.PATHS.SECURING_YOUR_DATA}`,
    ROUTER_SUPPLIER_CONCLUDED_CONTRACTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS}`,
    ROUTER_SIGN_UP: `/${CONSTS.PATHS.SIGN_UP}`,
    ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_POWER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS}/${CONSTS.PATHS.POWER}`,
    ROUTER_SUPPLIER_CONCLUDED_CONTRACTS_GAS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_CONCLUDED_CONTRACTS}/${CONSTS.PATHS.GAS}`,
    ROUTER_SUPPLY_POINTS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_POINTS}`,
    ROUTER_SUPPLY_OFFER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}`,
    ROUTER_SUPPLY_OFFER_POWER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}/${CONSTS.PATHS.POWER}`,
    ROUTER_SUPPLY_OFFER_GAS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLY_OFFER}/${CONSTS.PATHS.GAS}`,
    ROUTER_IMPORT_APPROVAL_POWER: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.IMPORT}/${CONSTS.PATHS.APPROVAL}/${CONSTS.PATHS.POWER}`,
    ROUTER_IMPORT_APPROVAL_GAS: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.IMPORT}/${CONSTS.PATHS.APPROVAL}/${CONSTS.PATHS.GAS}`,
    ROUTER_TERMS_OF_USE: `/${CONSTS.PATHS.TERMS_OF_USE}`,
    ROUTER_UNSUBSCRIBE_NEWS: `/${CONSTS.PATHS.UNSUBSCRIBE_NEWS}`,
    ROUTER_USER_CHANGE_PASSWORD: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.CHANGE_PASSWORD}`,
    ROUTER_USER_PROFILE: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.USER_PROFILE}`,
    ROUTER_SUPPLIER_PROFILE: `/${CONSTS.PATHS.SECURED}/${CONSTS.PATHS.SUPPLIER_PROFILE}`,
};

export enum INavigationItemType {
    NORMAL,
    ONLY_LABEL,
}

export const ARTICLES_PAGE = 'page';

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

export const CONTRACT_END_TYPE_TRANSLATE_MAP = {
    [CONTRACT_END_TYPE.CONTRACT_END_TERM]: 'Smlouva na dobu ur??itou',
    [CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION]:
        'Smlouva na dobu ur??itou s automatickou prolongac??',
    [CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD]:
        'Smlouva na dobu neur??itou',
    [CONTRACT_END_TYPE.CONTRACT_END_TERMINATE]: 'Vlastn?? v??pov????',
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

export enum CommodityTypesCsLowerCase {
    POWER = 'elektrina',
    GAS = 'plyn',
}

export const urlCommodityToCommodityType = {
    [CONSTS.PATHS.POWER]: CommodityTypesLowerCase.POWER,
    [CONSTS.PATHS.GAS]: CommodityTypesLowerCase.GAS,
};

export const commodityTypes = {
    [CommodityTypesLowerCase.POWER]: CommodityType.POWER,
    [CommodityTypesLowerCase.GAS]: CommodityType.GAS,
};

export enum SubjectTypeLowerCase {
    INDIVIDUAL = 'domacnost',
    BUSINESSMAN = 'firma',
}

export const SUBJECT_TYPE_OPTIONS: Array<IOption> = [
    {
        key: SubjectType.SUBJECT_TYPE_INDIVIDUAL,
        value: SubjectType.SUBJECT_TYPE_INDIVIDUAL,
        label: 'Dom??cnost',
    },
    {
        key: SubjectType.SUBJECT_TYPE_BUSINESSMAN,
        value: SubjectType.SUBJECT_TYPE_BUSINESSMAN,
        label: 'Firma',
    },
];

export const OWN_TERMINATE_OPTIONS: Array<IOption> = [
    {
        key: false,
        label: 'Chci, aby v??pov???? zajistil nov?? dodavatel',
    },
    {
        key: true,
        label: 'Vypov??m si s??m (sama)',
    },
];

export const COMMODITY_TYPE_OPTIONS: Array<IOption> = [
    {
        key: CommodityType.POWER,
        label: 'Elekt??ina',
    },
    {
        key: CommodityType.GAS,
        label: 'Plyn',
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

export const ANNUAL_CONSUMPTION_OPTIONS = [
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
        label: 'Hlavn?? m??sto Praha',
        value: 'Hlavn?? m??sto Praha',
        key: 'Hlavn?? m??sto Praha',
    },
    {
        label: 'Jiho??esk?? kraj',
        value: 'Jiho??esk?? kraj',
        key: 'Jiho??esk?? kraj',
    },
    {
        label: 'Jihomoravsk?? kraj',
        value: 'Jihomoravsk?? kraj',
        key: 'Jihomoravsk?? kraj',
    },
    {
        label: 'Karlovarsk?? kraj',
        value: 'Karlovarsk?? kraj',
        key: 'Karlovarsk?? kraj',
    },
    {
        label: 'Kr??lov??hradeck?? kraj',
        value: 'Kr??lov??hradeck?? kraj',
        key: 'Kr??lov??hradeck?? kraj',
    },
    {
        label: 'Libereck?? kraj',
        value: 'Libereck?? kraj',
        key: 'Libereck?? kraj',
    },
    {
        label: 'Moravskoslezsk?? kraj',
        value: 'Moravskoslezsk?? kraj',
        key: 'Moravskoslezsk?? kraj',
    },
    {
        label: 'Olomouck?? kraj',
        value: 'Olomouck?? kraj',
        key: 'Olomouck?? kraj',
    },
    {
        label: 'Pardubick?? kraj',
        value: 'Pardubick?? kraj',
        key: 'Pardubick?? kraj',
    },
    {
        label: 'Plze??sk?? kraj',
        value: 'Plze??sk?? kraj',
        key: 'Plze??sk?? kraj',
    },
    {
        label: 'St??edo??esk?? kraj',
        value: 'St??edo??esk?? kraj',
        key: 'St??edo??esk?? kraj',
    },
    {
        label: '??steck?? kraj',
        value: '??steck?? kraj',
        key: '??steck?? kraj',
    },
    {
        label: 'Kraj Vyso??ina',
        value: 'Kraj Vyso??ina',
        key: 'Kraj Vyso??ina',
    },
    {
        label: 'Zl??nsk?? kraj',
        value: 'Zl??nsk?? kraj',
        key: 'Zl??nsk?? kraj',
    },
];

export const OPERATIONS_WITHOUT_TOKEN = [];

export const OPERATIONS_IGNORE_ACCESS_DENIED_EXCEPTION = [];

export const OPERATIONS_WITHOUT_SCROLL_ON_ERRORS = [
    'getSupplyPointGlobalStatistics',
];

export enum RequestsOverviewBannerShow {
    NONE = 'NONE',
    TERMINATE_CONTRACT = 'TERMINATE_CONTRACT',
    LEAVE_CONTRACT = 'LEAVE_CONTRACT',
}
export const FILE_UPLOAD_CONFIG_PROVIDER = 'file_upload_config';

export const BUILD_ID_PROVIDER = 'buildID';

export const BUILD_ID_PROVIDER_SERVER = 'buildIDServer';

export const IS_PRERENDER_PROVIDER = 'isPrerender';

export const PAGE_URL_PROVIDER = 'PAGE_URL';

export enum ANNUAL_CONSUMPTION_TYPES {
    ANNUAL_CONSUMPTION_NT = 'annualConsumptionNT',
    ANNUAL_CONSUMPTION_VT = 'annualConsumptionVT',
    ANNUAL_CONSUMPTION = 'annualConsumption',
}

export enum ANNUAL_CONSUMPTION_UNIT_TYPES {
    ANNUAL_CONSUMPTION_NT_UNIT = 'annualConsumptionNTUnit',
    ANNUAL_CONSUMPTION_VT_UNIT = 'annualConsumptionVTUnit',
    ANNUAL_CONSUMPTION_UNIT = 'annualConsumptionUnit',
}

// czech is required by marketing agenture
export const GTM_CONSTS = {
    ACTIONS: {
        SIGN: 'sign the offer',
        SIGNED: 'offer signed',
        CONTINUE: 'continue',
        SELECT_OFFER: 'select offer',
        SENT: 'sent',
        VIEW: 'view',
        START: 'start',
        SAVE: 'save',
        SHOW_DETAIL: 'show detail',
    },
    BRAND: 'pxe',
    CATEGORIES: {
        REGISTRATION: 'sign up',
        FORM: 'form',
    },
    EVENTS: {
        EVENT_TRACKING: 'eventTracking',
        CHECKOUT: 'checkout',
        PURCHASE: 'purchase',
    },
    LABELS: {
        REGISTRATION: 'registration',
        STEP_ONE: 'step 1',
        STEP_TWO: 'step 2',
        STEP_THREE: 'step 3',
        STEP_FOUR: 'step 4',
        STEP_FIVE: 'step 5',
        STEP_SIX: 'step 6',
    },
};

export const externalScripts: IExternalResource[] = [
    {
        name: 'ccbundle',
        src: `ccbundle.min.js`,
    },
];

export const externalStyles: IExternalResource[] = [
    {
        name: 'ccstyles',
        src: `ccstyles.min.css`,
    },
];
