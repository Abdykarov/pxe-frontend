import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SupplyPointFormModule } from 'src/common/containers/form/forms/supply-point/supply-point-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointComponent } from './supply-point.component';
import { NewSupplyPointRoutingModule } from './supply-point.routing';

@NgModule({
    declarations: [SupplyPointComponent],
    imports: [
        BannerUIModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        NewSupplyPointRoutingModule,
        PlaceloaderModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SupplyPointFormModule,
    ],
})
export class SupplyPointModule {}
