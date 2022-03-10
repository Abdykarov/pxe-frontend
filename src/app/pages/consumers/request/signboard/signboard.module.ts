import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AskForOfferContainerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SignboardRoutingModule } from './signboard-routing.module';
import { SignboardComponent } from './signboard.component';

@NgModule({
    declarations: [SignboardComponent],
    imports: [
        AskForOfferContainerModule,
        CommonModule,
        ButtonModule,
        DirectivesModule,
        LayoutContainerModule,
        ProgressBarModule,
        SignboardRoutingModule,
    ],
})
export class SignboardModule {}
