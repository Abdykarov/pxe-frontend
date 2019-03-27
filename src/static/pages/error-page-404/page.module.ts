import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ErrorPage404Module } from 'src/common/ui/error-page-404/error-page-404.module';
import { ErrorPagePageComponent } from './page';

@NgModule({
    declarations: [
        ErrorPagePageComponent,
    ],
    exports: [
        ErrorPagePageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        ErrorPage404Module,
    ],
})
export class ErrorPagePageModule {}

export const errorPagePageRoutes: Routes = [
    {
        path: 'error-page-404',
        component: ErrorPagePageComponent,
    },
];
