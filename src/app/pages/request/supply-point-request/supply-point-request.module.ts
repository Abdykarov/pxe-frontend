import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyPointRequestRoutingModule } from './supply-point-request.routing';
import { SupplyPointFormModule } from 'src/common/containers/form/forms/supply-point/supply-point-form.module';
import { SupplyPointRequestComponent } from './supply-point-request.component';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        SupplyPointRequestComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SupplyPointFormModule,
        SupplyPointRequestRoutingModule,
    ],
})
export class SupplyPointRequestModule { }
