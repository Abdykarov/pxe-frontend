import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const navigationConfig: INavigationConfig = [
    [
        {
            'url': '/secured/dashboard',
            'label': 'NÁSTĚNKA',
            'icon': 'notice-board',
            __typename : 'secured',
        },
        {
            'url': '/secured/request',
            'label': 'ŽÁDOST',
            'icon': 'star',
            __typename : 'secured',
        },
        {
            'url': '/secured/supply-points',
            'label': 'ODBĚRNÁ MÍSTA',
            'icon': 'pin',
            __typename : 'secured',
        },
    ],
];
