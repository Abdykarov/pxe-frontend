import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';
import { FormModule } from '../../../common/ui/forms/form.module';
import { HistoryDetailComponent } from './page';

@NgModule({
    declarations: [HistoryDetailComponent],
    exports: [HistoryDetailComponent],
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
