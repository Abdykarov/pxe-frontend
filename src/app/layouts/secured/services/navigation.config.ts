import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const navigationConfig: INavigationConfig = [
    [
        {
            'url': '/secured',
            'label': 'NÁSTĚNKA',
            'icon': 'home',
            __typename : 'secured',
        },
        {
            'url': '/secured/request',
            'label': 'Žádost',
            'icon': 'home',
            __typename : 'secured',
        },
        {
            'url': '/secured/supply-point',
            'label': 'Odběrná místa',
            'icon': 'home',
            __typename : 'secured',
        },
    ],
];
