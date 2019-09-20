import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { PaginationModule } from 'ngx-bootstrap';
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
        PaginationModule.forRoot(),
        TableModule,
    ],
})
export class SupplierConcludedContractsModule {}

export const supplierConcludedContractsRoutes: Routes = [
    {
        path: 'supplier-concluded-contracts',
        component: SupplierConcludedContractsComponent,
        data: {
            isSimpleFooter: false,
            isPublic: false,
            isSupplier: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
            hideLeftNavigation: true,
        },
    },
];
