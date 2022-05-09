import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LoaderModule } from 'src/common/ui/loader/loader.module';
// own classes
import { LoaderPageComponent } from './page';

@NgModule({
    declarations: [LoaderPageComponent],
    exports: [LoaderPageComponent],
    imports: [BreadcrumbModule, CommonModule, LoaderModule],
})
export class LoaderPageModule {}

export const loaderPageRoutes: Routes = [
    {
        path: 'loader',
        component: LoaderPageComponent,
    },
];
