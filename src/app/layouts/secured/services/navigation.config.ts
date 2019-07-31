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
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ROUTER_REQUESTS,
        'label': 'ŽÁDOST',
        'icon': 'star',
        __typename : 'secured',
    },
    {
        'class': '',
        'url': ROUTES.ROUTER_SUPPLY_POINTS,
        'label': 'ODBĚRNÁ MÍSTA',
        'icon': 'pin',
        __typename : 'secured',
    },
];

export const navigationMenuSuppliers: INavigationMenu = [];

export const navigationMenuUserActions: INavigationMenu = [
    {
        'class': 'navigation-main__item--second',
        'label': 'Nastavení uživatelského účtu',
        'icon': 'user',
        'url': ROUTES.ROUTER_USER_PROFILE,
        __typename: 'profile',
    },
    {
        'class': 'navigation-main__item--second',
        'label': 'Změna hesla',
        'icon': 'lock-close',
        'url': `/${CONSTS.PATHS.CHANGE_PASSWORD}`,
        __typename: 'change-password',

    },
    {
        'class': 'navigation-main__item--second link--logout',
        'label': 'Odhlášení',
        'icon': 'power',
        'url' : `/${CONSTS.PATHS.LOGOUT}`,
        __typename: 'logout',
    },
];
