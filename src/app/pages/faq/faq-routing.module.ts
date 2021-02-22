import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { CONSTS } from 'src/app/app.constants';
import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { FaqResolver } from 'src/app/resolvers/faq.resolver';

const routes: Routes =
    [
        {
            path: CONSTS.PATHS.EMPTY,
            component: FaqComponent,
            resolve: {
                faq: FaqResolver,
            },
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/faq/faq-overview/faq-overview.module').then(m => m.FaqOverviewModule),
                },
                {
                    path: ':tag',
                    loadChildren: () => import('../../pages/faq/faq-overview/faq-overview.module').then(m => m.FaqOverviewModule),
                },
                {
                    path: ':tag/:url',
                    loadChildren: () => import('../../pages/faq/faq-detail/faq-detail.module').then(m => m.FaqDetailModule),
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
