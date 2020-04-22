import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { CarouselContainerModule } from 'src/common/containers/carousel-container/carousel-container.module';
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
        CarouselContainerModule,
        CommonModule,
        LandingRoutingModule,
        MapCoverageContainerModule,
        RegistrationFormModule,
    ],
})
export class LandingModule {}
