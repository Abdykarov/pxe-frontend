import { Component } from '@angular/core';

import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
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

    public openConsent(evt) {
        evt.preventDefault();
        console.log('openConsent');
    }

    submitSubscriptionForm(evt) {
        evt.preventDefault();
        console.log('submitSubscriptionForm');
    }
}
