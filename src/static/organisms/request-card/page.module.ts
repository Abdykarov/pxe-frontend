import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { RequestCardComponent } from './page';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';

@NgModule({
    declarations: [
        RequestCardComponent,
    ],
    exports: [
        RequestCardComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        RequestCardModule,
    ],
})
export class RequestCardPageModule {}

export const requestCardPageRoutes: Routes = [
    {
        path: 'request-card',
        component: RequestCardComponent,
        data: {
            isPublic: false,
        },
    },
];
