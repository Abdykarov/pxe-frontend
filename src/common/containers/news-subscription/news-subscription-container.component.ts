import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import { subscriptionFormFields } from './news-subsctiption-container.config';
import * as mutations from 'src/common/graphql/mutations';
import { SplitLastPipe } from 'src/common/pipes/split-last/split-last.pipe';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent {

    // public subscriptionForm: FormGroup;
    public submitSubscriptionLoading = false;
    public subscriptionFormFields = subscriptionFormFields;
    public subscriptionFormSent = false;
    public subscriptionError: string = null;

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
        private splitLastPipe: SplitLastPipe,
        // private fb: FormBuilder,
    ) {
        // this.subscriptionForm = this.fb.group(this.subscriptionFormFields.controls);
        console.log('%c ***** subscriptionFormFields0 *****', 'background: #bada55; color: #000; font-weight: bold', this.subscriptionFormFields);
        // this.subscriptionFormFields = subscriptionFormFields;
    }

    public submitSubscriptionForm = (values) => {
        console.log(values);
        this.submitSubscriptionLoading = true;
        this.subscriptionError = null;
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
                    console.log('%c ***** error *****', 'background: #bada55; color: #000; font-weight: bold', error);
                    console.log('%c ***** error *****', 'background: #bada55; color: #000; font-weight: bold', error.message);
                    this.subscriptionError = this.splitLastPipe.transform(error.message, ':');
                    this.cd.markForCheck();
                });
    }
}
