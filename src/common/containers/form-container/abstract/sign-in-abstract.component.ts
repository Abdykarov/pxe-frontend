import { ChangeDetectorRef } from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { signInFormFields } from '../sign-in-form/sign-in-form-container.config';

// rename + atributy + signInFormFields pres konstruktor!! :D
export class SignInAbstractComponent {
    public submitSubscriptionLoading = false;
    public subscriptionFormFields = signInFormFields;
    public subscriptionFormSent = false;
    public subscriptionGlobalError: string[] = [];
    public subscriptionFieldError: IFieldError = {};

    protected constructor(
        protected apollo: Apollo,
        protected cd: ChangeDetectorRef,
    ) {}

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
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.subscriptionFieldError = fieldError;
                    this.subscriptionGlobalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
