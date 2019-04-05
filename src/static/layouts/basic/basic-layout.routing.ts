import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

import {
    ButtonsPageModule,
    buttonsPageRoutes,
} from 'src/static/atoms/buttons/page.module';

import {
    ColorsPageModule,
    colorsPageRoutes,
} from 'src/static/atoms/colors/page.module';

import {
    IconsPageModule,
    iconsPageRoutes,
} from 'src/static/atoms/icons/page.module';

import {
    TypographyPageModule,
    typographyPageRoutes,
} from 'src/static/atoms/typography/page.module';

import { BasicLayoutComponent } from './basic-layout.component';

const routes: Routes = [
    {
        path: '',
        component: BasicLayoutComponent,
        children: [
            ...buttonsPageRoutes,
            ...colorsPageRoutes,
            ...iconsPageRoutes,
            ...typographyPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        ButtonsPageModule,
        ColorsPageModule,
        IconsPageModule,
        RouterModule.forChild(routes),
        TypographyPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class BasicLayoutRoutingModule {}
