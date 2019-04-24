import { Component } from '@angular/core';

import { configSupplier } from 'src/static/config/suppliers.config';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';
import { subscriptionFormFields } from 'src/common/containers/news-subscription/news-subsctiption-container.config';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './sign-in.component.html',
})
export class SignInComponent {
    public submitSubscriptionLoading = false;
    public subscriptionFormFields = subscriptionFormFields;
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
