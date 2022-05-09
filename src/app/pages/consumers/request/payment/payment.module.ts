import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
    declarations: [PaymentComponent],
    exports: [PaymentComponent],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PaymentRoutingModule,
        PipesModule,
        PlaceloaderModule,
        ProgressBarModule,
    ],
})
export class PaymentModule {}
