import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { ROUTES } from 'src/app/app.constants';


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
