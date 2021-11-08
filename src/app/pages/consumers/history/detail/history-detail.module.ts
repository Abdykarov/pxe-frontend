import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailContainerModule } from 'src/common/containers/history/detail-container/detail-container.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { HistoryDetailComponent } from './history-detail.component';
import { HistoryDetailRouting } from './history-detail.routing';

@NgModule({
    declarations: [HistoryDetailComponent],
    exports: [HistoryDetailComponent],
    imports: [
        CommonModule,
        LayoutContainerModule,
        HistoryDetailRouting,
        DetailContainerModule,
    ],
})
export class HistoryDetailModule {}
