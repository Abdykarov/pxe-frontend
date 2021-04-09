import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { LoaderPageComponent } from './page';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';

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
    ],
})
export class LoaderPageModule {}

export const loaderPageRoutes: Routes = [
    {
        path: 'loader',
        component: LoaderPageComponent,
    },
];
