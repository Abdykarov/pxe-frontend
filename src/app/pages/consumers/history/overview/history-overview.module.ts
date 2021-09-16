import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HistoryOverviewComponent } from './history-overview.component';
import { HistoryOverviewRouting } from './history-overview.routing';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { OverviewContainerModule } from 'src/common/containers/history/overview-container/overview-container.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        HistoryOverviewComponent,
    ],
    exports: [
        HistoryOverviewComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        HistoryOverviewRouting,
        OverviewContainerModule,
        SupplyPointModule,
    ],
})
export class HistoryOverviewModule { }
