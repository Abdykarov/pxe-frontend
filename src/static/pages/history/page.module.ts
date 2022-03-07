import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { HistoryComponent } from './page';

@NgModule({
    declarations: [HistoryComponent],
    exports: [HistoryComponent],
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
