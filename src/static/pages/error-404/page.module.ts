import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ErrorPage404Module } from 'src/common/ui/error-page-404/error-page-404.module';
import { ErrorPageComponent } from './page';

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
