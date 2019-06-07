import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ContractComponent } from './contract.component';
import { ContractFormModule } from 'src/common/containers/form/forms/contract/contract-form.module';
import { ContractRoutingModule } from './contract-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';

@NgModule({
    declarations: [
        ContractComponent,
    ],
    exports: [
        ContractComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        ContractFormModule,
        ContractRoutingModule,
        LayoutContainerModule,
        ProgressBarModule,
        SupplyPointOfferModule,
    ],
})
export class ContractModule { }
