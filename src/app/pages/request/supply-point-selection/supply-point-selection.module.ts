import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { SupplyPointSelectionComponent } from './supply-point-selection.component';
import { SupplyPointSelectionRoutingModule } from './supply-point-selection-routing.module';

@NgModule({
    declarations: [
        SupplyPointSelectionComponent,
    ],
    exports: [
        SupplyPointSelectionComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        ProgressBarModule,
        SupplyPointModule,
        SupplyPointSelectionRoutingModule,
    ],
})
export class SupplyPointSelectionModule { }
