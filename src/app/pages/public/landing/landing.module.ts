import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AskForOfferContainerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';
import { LpPersonalizationContainerModule } from 'src/common/containers/lp-personalization-container/lp-personalization-container.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { CardModule } from 'src/common/ui/card/card.module';
import { CarouselContainersModule } from 'src/common/ui/carousels/carousel-containers.module';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing.routing';

@NgModule({
    declarations: [LandingComponent],
    exports: [LandingComponent],
    imports: [
        AccordionModule,
        AskForOfferContainerModule,
        ButtonModule,
        CardModule,
        CarouselContainersModule,
        CommonModule,
        DirectivesModule,
        LandingRoutingModule,
        LpPersonalizationContainerModule,
        PipesModule,
        RegistrationFormModule,
        DirectivesModule,
    ],
})
export class LandingModule {}
