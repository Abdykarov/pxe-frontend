import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailComponent } from 'src/app/pages/consumers/supply-points-overview/detail/detail.component';
import { DetailRouting } from 'src/app/pages/consumers/supply-points-overview/detail/detail.routing';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { DetailContainerModule } from 'src/common/containers/supply-point-detail/detail-container.module';

@NgModule({
    declarations: [DetailComponent],
    exports: [DetailComponent],
    imports: [
        CommonModule,
        LayoutContainerModule,
        DetailRouting,
        DetailContainerModule,
    ],
})
export class DetailModule {}
