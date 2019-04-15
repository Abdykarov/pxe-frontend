import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { IFieldError } from 'src/common/ui/news-subscription/models/form-definition.model';
import { makeRegistration } from '../../graphql/mutation/news-registration';
import { parseGraphQLErrors } from 'src/common/utils/parse-graphql-errors.fnc';
import { subscriptionFormFields } from './news-subsctiption-container.config';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent {
    public submitSubscriptionLoading = false;
    public subscriptionFormFields = subscriptionFormFields;
    public subscriptionFormSent = false;
    public subscriptionGlobalError: string[] = [];
    public subscriptionFieldError: IFieldError = {};

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
    ) {}

    public submitSubscriptionForm = (values) => {
        this.submitSubscriptionLoading = true;
        this.subscriptionGlobalError = [];
        this.subscriptionFieldError = {};
        this.apollo
            .mutate({
                mutation: makeRegistration,
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
