import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { DeletedAccountComponent } from './deleted-account.component';
import { DeletedAccountRoutingModule } from 'src/app/pages/deleted-account/deleted-account.routing';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { MapCoverageContainerModule } from 'src/common/containers/map-coverage-container/map-coverage-container.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';

@NgModule({
    declarations: [
        DeletedAccountComponent,
    ],
    exports: [
        DeletedAccountComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        DeletedAccountRoutingModule,
        MapCoverageContainerModule,
        RegistrationFormModule,
    ],
})
export class DeletedAccountModule {}
