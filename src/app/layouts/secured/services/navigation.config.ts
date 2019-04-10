import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const navigationConfig: INavigationConfig = [
    [
        {
            'url': '/secured',
            'label': 'Úvodní přehled',
            'icon': 'home',
            __typename : 'secured',
        },
        {
            'label': 'Nákupní košík',
            'icon': 'cart',
            'url': '/secured/basket',
            __typename : 'barker',
            'children': [
                {
                    'url': '/secured/basket',
                    'label': 'Přehled',
                    __typename : 'basket',
                },
                {
                    'url': '/secured/basket/add',
                    'label': 'Přidat',
                    __typename : 'add',
                },
            ],
        },
    ],
    [
        {
            'url': '/logout',
            'label': 'Odhlásit se',
            'icon': 'logout',
            __typename : 'logout',
        },
    ],
];
