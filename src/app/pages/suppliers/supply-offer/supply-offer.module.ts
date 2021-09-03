import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { SupplyOfferComponent } from './supply-offer.component';
import { SupplyOfferFormModule } from 'src/common/containers/form/forms/supply-offer/supply-offer-form.module';
import { SupplyOfferRoutingModule } from './supply-offer-routing.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';

@NgModule({
    declarations: [
        SupplyOfferComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        DatepickerModule,
        DropdownModule,
        FormModule,
        InfoBannerModule,
        LayoutContainerModule,
        PipesModule,
        PlaceloaderModule,
        ReactiveFormsModule,
        SelectModule,
        SupplyOfferFormModule,
        SupplyOfferRoutingModule,
        TableModule,
        TooltipModule,
    ],
})
export class SupplyOfferModule { }
