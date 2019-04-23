import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { parseGraphQLErrors } from 'src/common/utils/';
import { subscriptionFormFields } from 'src/common/containers/news-subscription/news-subsctiption-container.config';

@Component({
    selector: 'pxe-sign-in-form-container',
    templateUrl: './sign-in-form-container.component.html',
    styleUrls: ['./sign-in-form-container.component.scss'],
})
export class SignInFormContainerComponent {

    public submitSubscriptionLoading = false;
    public subscriptionFormFields = subscriptionFormFields;
    public subscriptionFormSent = false;
    public subscriptionGlobalError: string[] = [];
    public subscriptionFieldError: IFieldError = {};

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
    ) {}

    public openConsent(evt) {
        evt.preventDefault();
        window.open('securing-your-data');
    }

    public submitSubscriptionForm = (values) => {
        this.submitSubscriptionLoading = true;
        this.subscriptionGlobalError = [];
        this.subscriptionFieldError = {};
        this.apollo
            .mutate({
                mutation: mutations.makeRegistration,
                variables: values,
            })
            .subscribe(
                () => {
                    this.submitSubscriptionLoading = false;
                    this.subscriptionFormSent = true;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.submitSubscriptionLoading = false;
                    const {fieldError, globalError} = parseGraphQLErrors(error);
                    this.subscriptionFieldError = fieldError;
                    this.subscriptionGlobalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
