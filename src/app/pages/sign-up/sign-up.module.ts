import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AskForOfferContainerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SupplierContainerModule } from 'src/common/containers/supplier-container/supplier-conteiner.module';

@NgModule({
    declarations: [
        SignUpComponent,
    ],
    exports: [
        SignUpComponent,
    ],
    imports: [
        AskForOfferContainerModule,
        CommonModule,
        LayoutContainerModule,
        RegistrationFormModule,
        SignUpRoutingModule,
        SupplierContainerModule,
    ],
})
export class SignUpModule { }
