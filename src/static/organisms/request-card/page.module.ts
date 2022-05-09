import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';
import { RequestCardComponent } from './page';

@NgModule({
    declarations: [RequestCardComponent],
    exports: [RequestCardComponent],
    imports: [BreadcrumbModule, CommonModule, RequestCardModule],
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
