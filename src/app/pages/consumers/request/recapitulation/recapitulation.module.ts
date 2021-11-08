import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { RecapitulationComponent } from './recapitulation.component';
import { RecapitulationRoutingModule } from './recapitulation.routing';

@NgModule({
    declarations: [RecapitulationComponent],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        PersonalInfoFormModule,
        PlaceloaderModule,
        ProgressBarModule,
        RecapitulationRoutingModule,
    ],
})
export class RecapitulationModule {}
