import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { HistoryDetailComponent } from './page';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';
import {FormModule} from '../../../common/ui/forms/form.module';

@NgModule({
    declarations: [
        HistoryDetailComponent,
    ],
    exports: [
        HistoryDetailComponent,
    ],
    imports: [
        ButtonModule,
        BreadcrumbModule,
        CommonModule,
        RequestCardModule,
        FormModule,
    ],
})
export class HistoryDetailModule {}

export const historyDetailPageRoutes: Routes = [
    {
        path: 'history-detail',
        component: HistoryDetailComponent,
        data: {
            isPublic: false,
        },
    },
];
