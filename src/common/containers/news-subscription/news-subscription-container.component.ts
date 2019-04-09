import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import { subscriptionFormFields } from './news-subsctiption-container.config';
import { SplitLastPipe } from 'src/common/pipes/split-last/split-last.pipe';

@Component({
    selector: 'pxe-news-subscription-container',
    templateUrl: './news-subscription-container.component.html',
    styleUrls: ['./news-subscription-container.component.scss'],
})
export class NewsSubscriptionContainerComponent {
    public submitSubscriptionLoading = false;
    public subscriptionFormFields = subscriptionFormFields;
    public subscriptionFormSent = false;
    public subscriptionError: string = null;

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
        private splitLastPipe: SplitLastPipe,
    ) {}

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
                    // this.subscriptionError = this.splitLastPipe.transform(error.message, ':');
                    this.subscriptionError = error;
                    this.cd.markForCheck();
                });
    }
}
/*
{
    "graphQLErrors": [
    {
        "errorMessage": "Internat communication error with serverSessionID není správné",
        "errorCode": "SEC9001",
        "locations": [],
        "errorType": "DataFetchingException",
        "message": "Internat communication error with serverSessionID není správné",
        "path": null,
        "extensions": null
    }
],
    "networkError": null,
    "message": "GraphQL error: Internat communication error with serverSessionID není správné"
}

{
  "graphQLErrors": [
    {
      "validationError": {
        "field": {
          "email": [
            "already-registered-email"
          ]
        }
      },
      "locations": [],
      "errorType": "ValidationError",
      "message": "Given mail was already registered",
      "path": null,
      "extensions": null
    }
  ],
  "networkError": null,
  "message": "GraphQL error: Given mail was already registered"
}

*/
