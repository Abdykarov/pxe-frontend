import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { BreadcrumbPageComponent } from './page';

@NgModule({
    declarations: [BreadcrumbPageComponent],
    exports: [BreadcrumbPageComponent],
    imports: [BreadcrumbModule, CommonModule, TableModule],
})
export class BreadcrumbPageModule {}

export const breadcrumbPageRoutes: Routes = [
    {
        path: 'breadcrumb',
        component: BreadcrumbPageComponent,
    },
];
