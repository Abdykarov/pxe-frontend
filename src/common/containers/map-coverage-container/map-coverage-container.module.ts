import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MapCoverageContainerComponent } from './map-coverage-container.component';
import { MapCoverageModule } from 'src/common/ui/map-coverage/map-coverage.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-conteiner/supplier-conteiner.module';

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
        SupplierContainerModule,
    ],
})
export class MapCoverageContainerModule { }