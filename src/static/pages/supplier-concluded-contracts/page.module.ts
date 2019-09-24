import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { PaginationNgxModule } from 'src/common/ui/pagination/pagination.module';
import { SupplierConcludedContractsComponent } from './page';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        SupplierConcludedContractsComponent,
    ],
    exports: [
        SupplierConcludedContractsComponent,
    ],
    imports: [
        CommonModule,
        PaginationNgxModule,
        TableModule,
    ],
})
export class SupplierConcludedContractsModule {}

export const supplierConcludedContractsRoutes: Routes = [
    {
        path: 'supplier-concluded-contracts',
        component: SupplierConcludedContractsComponent,
    },
];
