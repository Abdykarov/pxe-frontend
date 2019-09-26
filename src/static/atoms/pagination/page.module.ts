import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { PaginationPageComponent } from './page';

// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';

@NgModule({
    declarations: [
        PaginationPageComponent,
    ],
    exports: [
        PaginationPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        PaginationModule,
    ],
})
export class PaginationPageModule {}

export const paginationPageRoutes: Routes = [
    {
        path: 'pagination',
        component: PaginationPageComponent,
    },
];
