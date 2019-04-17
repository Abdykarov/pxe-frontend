import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
// import { ErrorPage404Module } from 'src/common/ui/error-page-404/error-page-404.module';
import { CookiesPageComponent } from './page';

@NgModule({
    declarations: [
        CookiesPageComponent,
    ],
    exports: [
        CookiesPageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        // CookiesPageModule,
    ],
})
export class CookiesPageModule {}

export const cookiesPageRoutes: Routes = [
    {
        path: 'cookies',
        component: CookiesPageComponent,
        data: {
            isSimpleFooter: true,
        },
    },
];
