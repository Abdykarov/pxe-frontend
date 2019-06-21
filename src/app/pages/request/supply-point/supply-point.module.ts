import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { NewSupplyPointRoutingModule } from './supply-point.routing';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointFormModule } from 'src/common/containers/form/forms/supply-point/supply-point-form.module';
import { SupplyPointComponent } from './supply-point.component';

@NgModule({
    declarations: [
        SupplyPointComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        NewSupplyPointRoutingModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SupplyPointFormModule,
    ],
})
export class SupplyPointModule {}
