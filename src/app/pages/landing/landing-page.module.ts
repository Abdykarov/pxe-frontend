import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page.routing';
import { ModalModule } from 'src/common/ui/modal/modal.module';
import { NewsSubscriptionContainerModule } from 'src/common/containers/news-subscription/news-subscription-container.module';

@NgModule({
    declarations: [
        LandingPageComponent,
    ],
    exports: [
        LandingPageComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        LandingPageRoutingModule,
        ModalModule,
        NewsSubscriptionContainerModule,
        ReactiveFormsModule,
    ],
})
export class LandingPageModule {}
