import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { PaginationPageComponent } from './page';

// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { PaginationNgxModule } from 'src/common/ui/pagination/pagination.module';

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
        PaginationNgxModule,
    ],
})
export class PaginationPageModule {}

export const paginationPageRoutes: Routes = [
    {
        path: 'pagination',
        component: PaginationPageComponent,
    },
];
