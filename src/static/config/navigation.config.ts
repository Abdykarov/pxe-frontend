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
                // {
                //     'label': 'Alerts',
                //     'url': '/alerts',
                // },
                // {
                //     'label': 'Banners',
                //     'url': '/banners',
                // },
                // {
                //     'label': 'Buttons',
                //     'url': '/buttons',
                // },
                // {
                //     'label': 'Cards',
                //     'url': '/card',
                // },
                {
                    'label': 'Colors',
                    'url': '/colors',
                },
                // {
                //     'label': 'Drop*',
                //     'url': '/dropdown',
                // },
                // {
                //     'label': 'Forms',
                //     'url': '/forms',
                // },
                // {
                //     'label': 'Icons',
                //     'url': '/icons',
                // },
                // {
                //     'label': 'Indicators',
                //     'url': '/indicators',
                // },
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
                // {
                //     'label': 'Tooltip',
                //     'url': '/tooltip',
                // },
                {
                    'label': 'Typography',
                    'url': '/typography',
                },
            ],
        },
        {
            'id': 'organisms',
            'label': 'Organisms',
            'icon': 'component-middle',
            'children': [
                // {
                //     'label': 'Breadcrumb',
                //     'url': '/breadcrumb',
                // },
                // {
                //     'label': 'Modals',
                //     'url': '/modals',
                // },
            ],
        },
        {
            'id': 'templates-and-pages',
            'label': 'Templates & Pages',
            'icon': 'component-high',
            'children': [
                {
                    'label': 'Landing page',
                    'url': '/landing-page',
                },
                // {
                //     'label': 'Error',
                //     'url': '/error-404',
                // },
            ],
        },
    ],
];
