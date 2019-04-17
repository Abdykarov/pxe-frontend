import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapCoverageContainerComponent } from './map-coverage-container.component';
import { MapCoverageModule } from 'src/common/ui/map-coverage/map-coverage.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        MapCoverageContainerComponent,
    ],
    exports: [
        MapCoverageContainerComponent,
    ],
    imports: [
        CommonModule,
        MapCoverageModule,
        SupplierModule,
    ],
})
export class MapCoverageContainerModule { }
