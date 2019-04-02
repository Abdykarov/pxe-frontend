import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ErrorPageComponent } from './page';
import { ErrorPage404Module } from '../../../common/ui/error-page-404/error-page-404.module';

@NgModule({
    declarations: [
        ErrorPageComponent,
    ],
    exports: [
        ErrorPageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        ErrorPage404Module,
    ],
})
export class ErrorPageModule {}

export const errorPageRoutes: Routes = [
    {
        path: 'error-404',
        component: ErrorPageComponent,
    },
];
