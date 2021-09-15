import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { LogoutInformationModule } from 'src/common/ui/logout-informationation/logout-information.module';
import { OverviewContainerComponent } from './overview-container.component';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplyPointModule } from 'src/common/ui/supply-point/supply-point.module';

@NgModule({
    declarations: [
        OverviewContainerComponent,
    ],
    exports: [
        OverviewContainerComponent,
    ],
    imports: [
        CommonModule,
        LogoutInformationModule,
        SupplyPointModule,
        AlertModule,
        PlaceloaderModule,
    ],
})
export class OverviewContainerModule { }
