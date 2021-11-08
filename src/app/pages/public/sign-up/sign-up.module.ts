import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AskForOfferContainerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ReCaptchaModule } from 'src/common/containers/re-captcha/re-captcha.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-container/supplier-conteiner.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
    declarations: [SignUpComponent],
    exports: [SignUpComponent],
    imports: [
        AskForOfferContainerModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        ReCaptchaModule,
        RegistrationFormModule,
        SignUpRoutingModule,
        SupplierContainerModule,
    ],
})
export class SignUpModule {}
