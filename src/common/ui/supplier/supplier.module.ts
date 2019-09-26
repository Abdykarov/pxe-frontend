import {
    CommonModule,
    DecimalPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';

import { PipesModule } from 'src/common/pipes/pipes.module';
import { SupplierComponent } from './supplier.component';
import { TabsModule } from 'src/common/ui/tabs/tabs.module';

@NgModule({
    declarations: [
        SupplierComponent,
    ],
    exports: [
        SupplierComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        TabsModule,
    ],
    providers: [
        DecimalPipe,
    ],
})
export class SupplierModule { }