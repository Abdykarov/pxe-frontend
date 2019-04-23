import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { parseGraphQLErrors } from 'src/common/utils/';
import { SignInAbstractComponent } from '../form-container/abstract/sign-in-abstract.component';
import { subscriptionFormFields } from './news-subsctiption-container.config';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent extends  SignInAbstractComponent {

    constructor(
        protected apollo: Apollo,
        protected cd: ChangeDetectorRef,
    ) {
        super(
            apollo,
            cd,
        );
    }

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
