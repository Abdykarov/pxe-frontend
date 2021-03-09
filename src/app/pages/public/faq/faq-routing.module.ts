import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { FaqComponent } from 'src/app/pages/public/faq/faq.component';

const routes: Routes =
    [
        {
            path: CONSTS.PATHS.EMPTY,
            component: FaqComponent,
            children: [
                {
                    path: '',
                    loadChildren: () => import('./faq-overview/faq-overview.module').then(m => m.FaqOverviewModule),
                },
                {
                    path: ':tag',
                    loadChildren: () => import('./faq-overview/faq-overview.module').then(m => m.FaqOverviewModule),
                },
                {
                    path: ':tag/:url',
                    loadChildren: () => import('./faq-detail/faq-detail.module').then(m => m.FaqDetailModule),
                },
            ],
        },
    ];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FaqRoutingModule { }
