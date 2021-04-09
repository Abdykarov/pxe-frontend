import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { LoaderPageComponent } from './page';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LoaderModule } from 'src/common/ui/loader/loader.module';

@NgModule({
    declarations: [
        LoaderPageComponent,
    ],
    exports: [
        LoaderPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        LoaderModule,
    ],
})
export class LoaderPageModule {}

export const loaderPageRoutes: Routes = [
    {
        path: 'loader',
        component: LoaderPageComponent,
    },
];
