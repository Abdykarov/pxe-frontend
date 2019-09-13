import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { INavigationMenu } from 'src/common/ui/navigation/models/navigation.model';

export const navigationMenuUsers: INavigationMenu = [
    {
        'class': '',
        'url': ROUTES.ROUTER_DASHBOARD,
        'label': 'NÁSTĚNKA',
        'icon': 'notice-board',
        'children': [],
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ROUTER_REQUESTS,
        'label': 'ROZPRACOVANÉ SMLOUVY',
        'icon': 'star',
        'children': [
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
        'label': 'PLATNÉ SMLOUVY',
        'icon': 'document',
        'children': [],
        __typename : 'secured',
    },
];

export const navigationMenuSuppliers: INavigationMenu = [];

export const navigationMenuUserActions: INavigationMenu = [
    {
        'class': 'navigation-main__item--second',
        'label': 'Profil uživatele',
        'icon': 'user',
        'url': ROUTES.ROUTER_USER_PROFILE,
        'children': [],
        __typename: 'profile',
    },
    {
        'class': 'navigation-main__item--second',
        'label': 'Změna hesla',
        'icon': 'lock-close',
        'url': ROUTES.ROUTER_USER_CHANGE_PASSWORD,
        'children': [],
        __typename: 'change-password',

    },
    {
        'class': 'navigation-main__item--second link--logout',
        'label': 'Odhlášení',
        'icon': 'power',
        'url' : `/${CONSTS.PATHS.LOGOUT}`,
        'children': [],
        __typename: 'logout',
    },
];

export const navigationMenuSuppliersActions: INavigationMenu = [
    {
        'class': 'link--logout',
        'label': 'Odhlášení',
        'icon': 'power',
        'url' : `/${CONSTS.PATHS.LOGOUT}`,
        'children': [],
        __typename: 'logout',
    },
];
