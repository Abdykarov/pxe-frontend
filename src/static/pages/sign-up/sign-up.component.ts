import { Component } from '@angular/core';

import { configSupplier } from 'src/static/config/suppliers.config';
import {
    IFieldError,
    SignUpType,
} from 'src/common/containers/form-container/models/form-definition.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';
import { registrationFormFieldsFnc } from 'src/common/containers/form-container/registration.config';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
    public submitSubscriptionLoading = false;
    public subscriptionFormFields = registrationFormFieldsFnc(SignUpType.SignUp);
    public subscriptionFormSent = false;
    public subscriptionGlobalError: string[] = [];
    public subscriptionFieldError: IFieldError = {};

    public configSupplier: ISupplier[] = configSupplier;

    public openConsent(evt) {
        evt.preventDefault();
        console.log('openConsent');
    }

    submitSubscriptionForm(evt) {
        evt.preventDefault();
        console.log('submitSubscriptionForm');
    }
}
