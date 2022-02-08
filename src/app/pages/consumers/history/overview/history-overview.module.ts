import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { OverviewContainerModule } from 'src/common/containers/supply-point-detail/overview-container/overview-container.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';
import { HistoryOverviewComponent } from './history-overview.component';
import { HistoryOverviewRouting } from './history-overview.routing';

@NgModule({
    declarations: [HistoryOverviewComponent],
    exports: [HistoryOverviewComponent],
    imports: [
        CommonModule,
        LayoutContainerModule,
        HistoryOverviewRouting,
        OverviewContainerModule,
        SupplyPointModule,
    ],
})
export class HistoryOverviewModule {}
