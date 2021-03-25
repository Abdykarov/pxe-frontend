import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { CreateUserComponent } from './create-user.component';
import { CreateUserRoutingModule } from './create-user-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { MicroTableModule } from 'src/common/ui/micro-table/micro-table.module';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { PricesComponent } from './prices/prices.component';
import { PricesFormModule } from 'src/common/containers/form/forms/prices/prices-form.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { RecapitulationComponent } from './recapitulation/recapitulation.component';
import { RecapitulationRoutingModule } from 'src/app/pages/consumers/request/recapitulation/recapitulation.routing';
import { SupplyPointComponent } from './supply-point/supply-point.component';
import { SupplyPointFormModule } from 'src/common/containers/form/forms/supply-point/supply-point-form.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';

@NgModule({
    declarations: [
        CreateUserComponent,
        PricesComponent,
        RecapitulationComponent,
        SupplyPointComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        CreateUserRoutingModule,
        LayoutContainerModule,
        MicroTableModule,
        PersonalInfoFormModule,
        PlaceloaderModule,
        PricesFormModule,
        ProgressBarModule,
        RouterModule,
        RecapitulationRoutingModule,
        SupplyPointFormModule,
        TooltipModule,
    ],
})
export class CreateUserModule { }
