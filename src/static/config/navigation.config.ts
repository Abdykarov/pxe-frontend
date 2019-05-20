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
                // {
                //     'label': 'Banners',
                //     'url': '/banners',
                // },
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
                // {
                //     'label': 'Drop*',
                //     'url': '/dropdown',
                // },
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
                //     'url': '/tables-basic',
                // },
                // {
                //     'label': 'Table - advanced',
                //     'url': '/tables-advanced',
                // },
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
                    'label': 'Progress bar',
                    'url': '/basic/progress',
                },
                {
                    'label': 'Supply point',
                    'url': '/basic/supply-point',
                },
                {
                    'label': 'Supply point offer',
                    'url': '/basic/supply-point-offer',
                },
            ],
        },
        {
            'id': 'templates-and-pages',
            'label': 'Templates & Pages',
            'icon': 'component-high',
            'children': [
                {
                    'label': 'Cookies policy',
                    'url': '/full/cookies',
                },
                {
                    'label': 'Landing page',
                    'url': '/full/landing-page',
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
                    'label': 'Registration',
                    'url': '/full/registration',
                },
                {
                    'label': 'New supply point',
                    'url': '/basic/new-supply-point',
                },
                {
                    'label': 'Sample points',
                    'url': '/basic/sample-points',
                },
                {
                    'label': 'Sample points banner',
                    'url': '/basic/sample-points-banner',
                },
                // {
                //     'label': 'Error',
                //     'url': '/error-404',
                // },
            ],
        },
        {
            'id': 'logout',
            'label': 'Odhlášení',
            'icon': 'flame',
            'class': 'navigation-main__item--logout',
        },
    ],
];
