import {
    CONSTS,
    INavigationItemType,
    ROUTES,
} from 'src/app/app.constants';
import { INavigationMenu } from 'src/common/ui/navigation/models/navigation.model';

export const navigationMenuUsers: INavigationMenu = [
    {
        'class': '',
        'url': ROUTES.ROUTER_DASHBOARD,
        'label': 'Přehled',
        'icon': 'notice-board',
        'type': INavigationItemType.NORMAL,
        'children': [],
        __typename : 'secured',
    },
    {
        'class': '',
        'url': '',
        'label': 'Smlouvy',
        'type': INavigationItemType.ONLY_LABEL,
        'icon': '',
        'children': [],
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ROUTER_REQUESTS,
        'label': 'Rozpracované',
        'type': INavigationItemType.NORMAL,
        'icon': 'star',
        'children': [
            {
                'label': 'Nové odběrné místo',
                'url': ROUTES.ROUTER_REQUEST_SIGNBOARD,
                __typename : 'securedChild',
            },
            {
                'label': 'Nové odběrné místo',
                'url': ROUTES.ROUTER_REQUEST_SUPPLY_POINT,
                __typename : 'securedChild',
            },
            {
                'label': 'Nová nabídka',
                'url': ROUTES.ROUTER_REQUEST_OFFER_SELECTION,
                __typename : 'securedChild',
            },
            {
                'label': 'Rekapitulace',
                'url': ROUTES.ROUTER_REQUEST_RECAPITULATION,
                __typename : 'securedChild',
            },
            {
                'label': 'Podepsání smlouvy',
                'url': ROUTES.ROUTER_REQUEST_CONTRACT,
                __typename : 'securedChild',
            },
            {
                'label': 'Platba',
                'url': ROUTES.ROUTER_REQUEST_PAYMENT,
                __typename : 'securedChild',
            },
        ],
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ROUTER_SUPPLY_POINTS,
        'label': 'Uzavřené',
        'type': INavigationItemType.NORMAL,
        'icon': 'document',
        'children': [],
        __typename : 'secured',
    },
];

export const navigationMenuSuppliers: INavigationMenu = [];

export const navigationMenuAdmins: INavigationMenu = [
    {
        'class': '',
        'url': ROUTES.ROUTER_ASK_FOR_OFFER_NEW,
        'label': 'Přijaté',
        'icon': 'icon--document-warning',
        'type': INavigationItemType.NORMAL,
        'children': [],
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ROUTER_ASK_FOR_OFFER_IN_PROGRESS,
        'label': 'Rozpracované',
        'icon': 'icon--document-down',
        'type': INavigationItemType.NORMAL,
        'children': [],
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ASK_FOR_OFFER_PROCESSED,
        'label': 'Uzavřené',
        'icon': 'icon--document-success',
        'type': INavigationItemType.NORMAL,
        'children': [],
        __typename : 'secured',
    },
];

export const navigationMenuUserActions: INavigationMenu = [
    {
        'class': 'd-lg-none',
        'url': '',
        'label': 'Účet',
        'type': INavigationItemType.ONLY_LABEL,
        'icon': '',
        'children': [],
        __typename : 'secured',
    },
    {
        'class': 'navigation-main__item--second',
        'label': 'Profil uživatele',
        'type': INavigationItemType.NORMAL,
        'icon': 'user',
        'url': ROUTES.ROUTER_USER_PROFILE,
        'children': [],
        __typename: 'profile',
    },
    {
        'class': 'navigation-main__item--second',
        'label': 'Změna hesla',
        'type': INavigationItemType.NORMAL,
        'icon': 'lock-close',
        'url': ROUTES.ROUTER_USER_CHANGE_PASSWORD,
        'children': [],
        __typename: 'change-password',

    },
    {
        'class': 'navigation-main__item--second link--logout',
        'label': 'Odhlášení',
        'type': INavigationItemType.NORMAL,
        'icon': 'power',
        'url' : `/${CONSTS.PATHS.LOGOUT}`,
        'children': [],
        __typename: 'logout',
    },
];

export const navigationMenuSuppliersActions: INavigationMenu = [
    {
        'class': 'navigation-main__item--second',
        'label': 'Nabídky',
        'type': INavigationItemType.NORMAL,
        'icon': 'star',
        'url' : `/${ROUTES.ROUTER_SUPPLY_OFFER}`,
        'children': [],
        __typename: 'supply-offers',
    },
    {
        'class': 'navigation-main__item--second',
        'label': 'Smlouvy',
        'type': INavigationItemType.NORMAL,
        'icon': 'document',
        'url' : `/${ROUTES.ROUTER_SUPPLIER_CONCLUDED_CONTRACTS}`,
        'children': [],
        __typename: 'contracts',
    },
    {
        'class': 'link--logout',
        'label': 'Odhlášení',
        'type': INavigationItemType.NORMAL,
        'icon': 'power',
        'url' : `/${CONSTS.PATHS.LOGOUT}`,
        'children': [],
        __typename: 'logout',
    },
];

export const navigationMenuAdminsActions: INavigationMenu = [
    {
        'class': 'navigation-main__item--second link--logout',
        'label': 'Odhlášení',
        'type': INavigationItemType.NORMAL,
        'icon': 'power',
        'url' : `/${CONSTS.PATHS.LOGOUT}`,
        'children': [],
        __typename: 'logout',
    },
];
