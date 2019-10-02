import {
    CommonModule,
    DecimalPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';

import { MapCoverageComponent } from './map-coverage.component';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';
import { TabsModule } from 'src/common/ui/tabs/tabs.module';

@NgModule({
    declarations: [
        MapCoverageComponent,
    ],
    exports: [
        MapCoverageComponent,
    ],
    imports: [
        CommonModule,
        PlaceloaderModule,
        PipesModule,
        SupplierModule,
        TabsModule,
    ],
    providers: [
        DecimalPipe,
    ],
})
export class MapCoverageModule { }
