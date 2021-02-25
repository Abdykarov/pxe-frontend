import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { PricesComponent } from './prices.component';
import { PricesRoutingModule } from './prices.routing';
import {PricesFormModule} from 'src/common/containers/form/forms/prices/prices-form.module';

@NgModule({
    declarations: [
        PricesComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        PersonalInfoFormModule,
        PlaceloaderModule,
        ProgressBarModule,
        PricesFormModule,
        PricesRoutingModule,
    ],
})
export class PricesModule {
    constructor() {
        console.log('PRICES MODUL IS LOEADED');
    }

}
