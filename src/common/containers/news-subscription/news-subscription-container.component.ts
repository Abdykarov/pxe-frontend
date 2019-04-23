import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { parseGraphQLErrors } from 'src/common/utils/';
import { subscriptionFormFields } from './news-subsctiption-container.config';
import { RegisterAbstractComponent } from '../form-container/abstract/register-abstract.component';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent extends  RegisterAbstractComponent {

    constructor(
        protected apollo: Apollo,
        protected cd: ChangeDetectorRef,
    ) {
        super(
            apollo,
            cd,
            subscriptionFormFields,
        );
    }

    public openConsent(evt) {
        evt.preventDefault();
        window.open('securing-your-data');
    }

    public submitSubscriptionForm = (values) => {
        this.submitRegistrationLoading = true;
        this.registrationGlobalError = [];
        this.registrationFieldError = {};
        this.apollo
            .mutate({
                mutation: mutations.makeRegistration,
                variables: values,
            })
            .subscribe(
                () => {
                    this.submitRegistrationLoading = false;
                    this.registrationFormSent = true;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.submitRegistrationLoading = false;
                    const {fieldError, globalError} = parseGraphQLErrors(error);
                    this.registrationFieldError = fieldError;
                    this.registrationGlobalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
