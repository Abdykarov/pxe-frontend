import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplyPointDetailFormModule } from 'src/common/containers/form/forms/supply-point/detail/supply-point-detail-form.module';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';
import { DetailContainerComponent } from 'src/common/containers/supply-point-detail/detail-container.component';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { SecuredPipesModule } from 'src/common/pipes/secured/secured-pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';

@NgModule({
    declarations: [DetailContainerComponent],
    exports: [DetailContainerComponent],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        PipesModule,
        PlaceloaderModule,
        SupplyPointDetailFormModule,
        BannerUIModule,
        SecuredPipesModule,
        VerificationFormModule,
    ],
})
export class DetailContainerModule {}
