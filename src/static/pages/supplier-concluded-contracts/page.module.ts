import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { SupplierConcludedContractsComponent } from './page';

@NgModule({
    declarations: [SupplierConcludedContractsComponent],
    exports: [SupplierConcludedContractsComponent],
    imports: [CommonModule, PaginationModule, PipesModule, TableModule],
})
export class SupplierConcludedContractsModule {}

export const supplierConcludedContractsRoutes: Routes = [
    {
        path: 'supplier-concluded-contracts',
        component: SupplierConcludedContractsComponent,
        data: {
            isPublic: false,
        },
    },
];
