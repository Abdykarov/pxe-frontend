import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page.routing';
import { MapCoverageContainerModule } from 'src/common/containers/map-coverage-container/map-coverage-container.module';
import { NewsSubscriptionFormModule } from 'src/common/containers/form/forms/news-subscription/news-subscription-form.module';

@NgModule({
    declarations: [
        LandingPageComponent,
    ],
    exports: [
        LandingPageComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        LandingPageRoutingModule,
        MapCoverageContainerModule,
        NewsSubscriptionFormModule,
    ],
})
export class LandingPageModule {}
