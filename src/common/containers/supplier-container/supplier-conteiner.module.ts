import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SupplierContainerComponent } from './supplier-container.component';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';


@NgModule({
    declarations: [
        SupplierContainerComponent,
    ],
    exports: [
        SupplierContainerComponent,
    ],
    imports: [
        CommonModule,
        SupplierModule,
    ],
})
export class SupplierContainerModule {}
