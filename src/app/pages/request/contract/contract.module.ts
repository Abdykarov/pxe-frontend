import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ContractComponent } from './contract.component';
import { ContractRoutingModule } from './contract-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';

@NgModule({
    declarations: [
        ContractComponent,
    ],
    exports: [
        ContractComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        ContractRoutingModule,
        LayoutContainerModule,
        PipesModule,
        ProgressBarModule,
        SupplyPointOfferModule,
        VerificationFormModule,
    ],
})
export class ContractModule {}
