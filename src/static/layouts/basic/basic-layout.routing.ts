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
        RouterModule.forChild(routes),
        TypographyPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class BasicLayoutRoutingModule {}
