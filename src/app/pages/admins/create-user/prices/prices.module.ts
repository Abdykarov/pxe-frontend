import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { PricesComponent } from './prices.component';
import { PricesFormModule } from 'src/common/containers/form/forms/prices/prices-form.module';
import { PricesRoutingModule } from './prices.routing';

@NgModule({
    declarations: [
        PricesComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        PlaceloaderModule,
        PricesFormModule,
        PricesRoutingModule,
    ],
})
export class PricesModule {
    constructor() {
        console.log('PRICES MODUL IS LOEADED');
    }

}
