import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';
import { SupplierContainerComponent } from './supplier-container.component';

@NgModule({
    declarations: [SupplierContainerComponent],
    exports: [SupplierContainerComponent],
    imports: [CommonModule, SupplierModule],
})
export class SupplierContainerModule {}
