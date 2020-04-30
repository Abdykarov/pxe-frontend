import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';
import { CONSTS } from 'src/app/app.constants';
import { FaqComponent } from 'src/app/pages/faq/faq.component';

const routes: Routes =
    [
        {
            path: CONSTS.PATHS.EMPTY,
            component: FaqComponent,
            children: [
                {
                    path: '',
                    loadChildren: '../../pages/faq/faq-overview/faq-overview.module#FaqOverviewModule',
                },
                {
                    path: ':tag',
                    loadChildren: '../../pages/faq/faq-overview/faq-overview.module#FaqOverviewModule',
                },
                {
                    path: ':tag/:url',
                    loadChildren: '../../pages/faq/faq-detail/faq-detail.module#FaqDetailModule',
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
