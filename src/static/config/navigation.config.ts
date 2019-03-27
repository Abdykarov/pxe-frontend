import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';

export const staticNavigationConfig: INavigationConfig = [
    [
        {
            'id': 'atoms-and-molecules',
            'label': 'Atoms',
            'icon': 'component-low',
            'children': [],
        },
        {
            'id': 'organisms',
            'label': 'Organisms',
            'icon': 'component-middle',
            'children': [],
        },
        {
            'id': 'templates-and-pages',
            'label': 'Templates',
            'icon': 'component-high',
            'children': [],
        },
        {
            'id': 'templates-and-pages',
            'label': 'Pages',
            'icon': 'component-high',
            'children': [
                {
                    'label': 'Error page 404',
                    'url': '/error-page-404',
                },
            ],
        },
    ],
];
