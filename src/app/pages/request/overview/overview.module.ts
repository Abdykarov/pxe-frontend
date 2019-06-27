import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { RequestCardModule } from 'src/common/ui/request-card/request-card.module';

@NgModule({
    declarations: [
        OverviewComponent,
    ],
    exports: [
        OverviewComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        OverviewRoutingModule,
        RequestCardModule,
    ],
})
export class OverviewModule { }
