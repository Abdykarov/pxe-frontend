import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { HistoryComponent } from './page';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        HistoryComponent,
    ],
    exports: [
        HistoryComponent,
    ],
    imports: [
        ButtonModule,
        BreadcrumbModule,
        CommonModule,
        RequestCardModule,
        SupplyPointModule,
    ],
})
export class HistoryModule {}

export const historyRoutes: Routes = [
    {
        path: 'history',
        component: HistoryComponent,
        data: {
            isPublic: false,
        },
    },
];
