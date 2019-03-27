import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const navigationConfig: INavigationConfig = [
    [
        {
            'url': '/secured/dashboard',
            'label': 'Úvodní přehled',
            'icon': 'home',
        },
        {
            'id': 'analysis',
            'label': 'Nákupní košík',
            'icon': 'cart',
            'children': [
                {
                    'url': '/secured/cart',
                    'label': 'Přehled',
                },
            ],
        },
    ],
    [
        {
            'url': '/logout',
            'label': 'Odhlásit se',
            'icon': 'logout',
        },
    ],
];
