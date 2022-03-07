import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';
// own classes
import { PaginationPageComponent } from './page';

@NgModule({
    declarations: [PaginationPageComponent],
    exports: [PaginationPageComponent],
    imports: [BreadcrumbModule, CommonModule, PaginationModule],
})
export class PaginationPageModule {}

export const paginationPageRoutes: Routes = [
    {
        path: 'pagination',
        component: PaginationPageComponent,
    },
];
