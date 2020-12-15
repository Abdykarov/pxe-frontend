import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { RequestComponent } from './page';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';

@NgModule({
    declarations: [
        RequestComponent,
    ],
    exports: [
        RequestComponent,
    ],
    imports: [
        ButtonModule,
        BreadcrumbModule,
        CommonModule,
        RequestCardModule,
    ],
})
export class RequestPageModule {}

export const requestPageRoutes: Routes = [
    {
        path: 'request',
        component: RequestComponent,
        data: {
            isPublic: false,
        },
    },
];
