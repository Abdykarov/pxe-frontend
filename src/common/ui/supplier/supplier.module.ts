import {
    CommonModule,
    DecimalPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from 'src/common/pipes/common/pipes.module';
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
        RouterModule,
        TabsModule,
    ],
    providers: [
        DecimalPipe,
    ],
})
export class SupplierModule { }
