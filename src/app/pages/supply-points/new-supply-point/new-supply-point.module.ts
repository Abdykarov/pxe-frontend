import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { NewSupplyPointRoutingModule } from './new-supply-point.routing';
import { SupplyPointFormModule } from 'src/common/containers/form/forms/supply-point/supply-point-form.module';
import { NewSupplyPointComponent } from './new-supply-point.component';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        NewSupplyPointComponent,
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
export class NewSupplyPointModule {}
