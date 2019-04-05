import {
    CommonModule,
    DecimalPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';

import { MapCoverageComponent } from './map-coverage.component';
import { MapCoverageRoutingModule } from './map-coverage-routing.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { TabsModule } from 'src/common/ui/tabs/tabs.module';

@NgModule({
    providers: [DecimalPipe],
    declarations: [
        MapCoverageComponent,
    ],
    imports: [
        CommonModule,
        MapCoverageRoutingModule,
        TabsModule,
        PipesModule,
    ],
})
export class MapCoverageModule { }
