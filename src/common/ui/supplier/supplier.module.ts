import {
    CommonModule,
    DecimalPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';

import { SuplierComponent } from './map-coverage.component';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { TabsModule } from 'src/common/ui/tabs/tabs.module';

@NgModule({
    declarations: [
        SuplierComponent,
    ],
    exports: [
        SuplierComponent,
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
