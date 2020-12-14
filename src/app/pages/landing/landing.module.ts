import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { CarouselContainerModule } from 'src/common/containers/carousel-container/carousel-container.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';
import { MapCoverageContainerModule } from 'src/common/containers/map-coverage-container/map-coverage-container.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';

@NgModule({
    declarations: [
        LandingComponent,
    ],
    exports: [
        LandingComponent,
    ],
    imports: [
        AccordionModule,
        ButtonModule,
        CarouselContainerModule,
        CommonModule,
        DirectivesModule,
        LandingRoutingModule,
        MapCoverageContainerModule,
        PipesModule,
        RegistrationFormModule,
        DirectivesModule,
    ],
})
export class LandingModule {}
