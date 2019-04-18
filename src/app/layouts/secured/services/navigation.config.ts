import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const navigationConfig: INavigationConfig = [
    [
        {
            'url': '/secured/dashboard',
            'label': 'NÁSTĚNKA',
            'icon': 'home',
            __typename : 'secured',
        },
        {
            'url': '/secured/request',
            'label': 'ŽÁDOST',
            'icon': 'home',
            __typename : 'secured',
        },
        {
            'url': '/secured/supply-point',
            'label': 'ODBĚRNÁ MÍSTA',
            'icon': 'home',
            __typename : 'secured',
        },
    ],
];
