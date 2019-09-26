import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const staticNavigationConfig: INavigationConfig = [
    [
        {
            'id': 'atoms-and-molecules',
            'label': 'Atoms & Molecules',
            'icon': 'component-low',
            'children': [
                // {
                //     'label': 'Accordion',
                //     'url': '/accordion',
                // },
                // {
                //     'label': 'Add',
                //     'url': '/add',
                // },
                {
                    'label': 'Alerts',
                    'url': '/basic/alerts',
                },
                {
                    'label': 'Badge',
                    'url': '/basic/badges',
                },
                {
                    'label': 'Banner',
                    'url': '/basic/banners',
                },
                {
                    'label': 'Buttons',
                    'url': '/basic/buttons',
                },
                // {
                //     'label': 'Cards',
                //     'url': '/card',
                // },
                {
                    'label': 'Colors',
                    'url': '/basic/colors',
                },
                {
                    'label': 'Dropdown',
                    'url': '/basic/dropdown',
                },
                {
                    'label': 'Forms',
                    'url': '/basic/forms',
                },
                {
                    'label': 'Icons',
                    'url': '/basic/icons',
                },
                {
                    'label': 'Indicators',
                    'url': '/basic/indicators',
                },
                // {
                //     'label': 'Pagination',
                //     'url': '/pagination',
                // },
                // {
                //     'label': 'Placeloader',
                //     'url': '/placeloader',
                // },
                // {
                //     'label': 'Table - simple',
                //     'url': '/basic/tables-basic',
                // },
                {
                    'label': 'Table - advanced',
                    'url': '/basic/tables-advanced',
                },
                // {
                //     'label': 'Tabs',
                //     'url': '/tabs',
                // },
                // {
                //     'label': 'Tips',
                //     'url': '/tips',
                // },
                {
                    'label': 'Tooltip',
                    'url': '/basic/tooltip',
                },
                {
                    'label': 'Typography',
                    'url': '/basic/typography',
                },
            ],
        },
        {
            'id': 'organisms',
            'label': 'Organisms',
            'icon': 'component-middle',
            'children': [
                {
                    'label': 'Breadcrumb',
                    'url': '/basic/breadcrumb',
                },
                {
                    'label': 'Info banner',
                    'url': '/basic/info-banner',
                },
                {
                    'label': 'Modals',
                    'url': '/basic/modals',
                },
                {
                    'label': 'News',
                    'url': '/basic/news',
                },
                {
                    'label': 'Progress bar',
                    'url': '/basic/progress',
                },
                {
                    'label': 'Request card',
                    'url': '/basic/request-card',
                },
                {
                    'label': 'Supply point',
                    'url': '/basic/supply-point',
                },
                {
                    'label': 'Supply point offer',
                    'url': '/basic/supply-point-offer',
                },
                {
                    'label': 'Supply offer',
                    'url': '/basic/supply-offer',
                },
                {
                    'label': 'Supply point overview',
                    'url': '/basic/supply-point-overview',
                },
            ],
        },
        {
            'id': 'templates-and-pages',
            'label': 'Templates & Pages',
            'icon': 'component-high',
            'children': [
                {
                    'label': 'Contract signing',
                    'url': '/basic/contract-signing',
                },
                {
                    'label': 'Cookies policy',
                    'url': '/full/cookies',
                },
                {
                    'label': 'Change password (old)',
                    'url': '/full/change-password',
                },
                {
                    'label': 'Change password',
                    'url': '/basic/user-profile-change-password',
                },
                {
                    'label': 'Change password (banner)',
                    'url': '/basic/change-password-banner',
                },
                {
                    'label': 'Dashboard',
                    'url': '/basic/dashboard',
                },
                {
                    'label': 'Landing page',
                    'url': '/full/landing-page',
                },
                {
                    'label': 'List supply points',
                    'url': '/basic/list-supply-points',
                },
                {
                    'label': 'Login',
                    'url': '/full/login',
                },
                {
                    'label': 'Login after registration',
                    'url': '/full/login-after-registration',
                },
                {
                    'label': 'Payment verification',
                    'url': '/basic/payment-verification',
                },
                {
                    'label': 'Registration',
                    'url': '/full/registration',
                },
                {
                    'label': 'Request',
                    'url': '/basic/request',
                },
                {
                    'label': 'Request (banner)',
                    'url': '/basic/request-banner',
                },
                {
                    'label': 'New supply point',
                    'url': '/basic/new-supply-point',
                },
                {
                    'label': 'supply offer',
                    'url': '/full/supply-offer',
                },
                {
                    'label': 'Supply points',
                    'url': '/basic/supply-points',
                },
                {
                    'label': 'Supply points (banner)',
                    'url': '/basic/supply-points-banner',
                },
                {
                    'label': 'Supply points (detail)',
                    'url': '/basic/supply-points-detail',
                },
                {
                    'label': 'Supply points offer',
                    'url': '/basic/supply-points-offer',
                },
                {
                    'label': 'Recapitulation',
                    'url': '/basic/recapitulation',
                },
                {
                    'label': 'User profile',
                    'url': '/basic/user-profile',
                },
                // {
                //     'label': 'Error',
                //     'url': '/error-404',
                // },
            ],
        },
        {
            'id': 'profile',
            'label': 'Profil uživatele',
            'icon': 'user',
            'class': 'navigation-main__item--second',
        },
        {
            'id': 'change-password',
            'label': 'Změna hesla',
            'icon': 'lock-close',
            'class': 'navigation-main__item--second',
        },
        {
            'id': 'logout',
            'label': 'Odhlášení',
            'icon': 'power',
            'class': 'navigation-main__item--second link--logout',
        },
    ],
];