import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';


export const navigationConfigUser: INavigationConfig = [
    [
        {
            'url': ROUTES.ROUTER_DASHBOARD,
            'label': 'NÁSTĚNKA',
            'icon': 'notice-board',
            __typename : 'secured',
        },
        {
            'url': ROUTES.ROUTER_REQUEST,
            'label': 'ŽÁDOST',
            'icon': 'star',
            __typename : 'secured',
        },
        {
            'url': ROUTES.ROUTER_SUPPLY_POINTS,
            'label': 'ODBĚRNÁ MÍSTA',
            'icon': 'pin',
            __typename : 'secured',
        },
    ],
];


export const navigationConfigSupplier: INavigationConfig = [
    [],
];

export const navigationConfigUserActions: INavigationConfig = [
    [
        {
            'id': 'profile',
            'label': 'Profil uživatele',
            'icon': 'user',
            'class': 'navigation-main__item--second',
            'url': `/${CONSTS.PATHS.PROFILE}`,
            __typename: 'profile',
        },
        {
            'id': 'change-password',
            'label': 'Změna hesla',
            'icon': 'lock-close',
            'class': 'navigation-main__item--second',
            'url': `/${CONSTS.PATHS.CHANGE_PASSWORD}`,
            __typename: 'change-password',

        },
        {
            'id': 'logout',
            'label': 'Odhlášení',
            'icon': 'flame',
            'class': 'navigation-main__item--logout',
            'url' : `/${CONSTS.PATHS.LOGOUT}`,
            __typename: 'logout',
        },
    ],
];
