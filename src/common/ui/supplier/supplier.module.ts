import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { TabsModule } from 'src/common/ui/tabs/tabs.module';
import { SupplierComponent } from './supplier.component';

@NgModule({
    declarations: [SupplierComponent],
    exports: [SupplierComponent],
    imports: [CommonModule, PipesModule, RouterModule, TabsModule],
    providers: [DecimalPipe],
})
export class SupplierModule {}
