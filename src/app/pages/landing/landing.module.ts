import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { CarouselModule } from 'src/common/ui/carousel/carousel.module';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';
import { MapCoverageContainerModule } from 'src/common/containers/map-coverage-container/map-coverage-container.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';

@NgModule({
    declarations: [
        LandingComponent,
    ],
    exports: [
        LandingComponent,
    ],
    imports: [
        ButtonModule,
        CarouselModule,
        CommonModule,
        LandingRoutingModule,
        MapCoverageContainerModule,
        RegistrationFormModule,
    ],
})
export class LandingModule {}
