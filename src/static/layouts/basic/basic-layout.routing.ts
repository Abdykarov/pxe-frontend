import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

import {
    ColorsPageModule,
    colorsPageRoutes,
} from 'src/static/atoms/colors/page.module';
import {
    FormsPageModule,
    formsPageRoutes,
} from 'src/static/atoms/forms/page.module';
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
            ...colorsPageRoutes,
            ...formsPageRoutes,
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
        ColorsPageModule,
        FormsPageModule,
        IconsPageModule,
        RouterModule.forChild(routes),
        TypographyPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class BasicLayoutRoutingModule {}
