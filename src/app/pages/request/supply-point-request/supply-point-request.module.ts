import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { SupplyPointRequestRoutingModule } from './supply-point-request.routing';
import { SupplyPointFormModule } from 'src/common/containers/form-container/supply-point-form/supply-point-form.module';
import { SupplyPointRequestComponent } from './supply-point-request.component';

@NgModule({
    declarations: [
        SupplyPointRequestComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        ReactiveFormsModule,
        SupplyPointFormModule,
        SupplyPointRequestRoutingModule,
    ],
})
export class SupplyPointRequestModule { }
