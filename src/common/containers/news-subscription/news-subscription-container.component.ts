import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
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
    public subscriptionGlobalError: string[] = [];
    public subscriptionFieldError: any = {};

    public error;
    public data2;

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
        private splitLastPipe: SplitLastPipe,
    ) {
        const data = {
            'email': [
                'already-registered-email',
                'already-registered-email2',
            ],
        };
        this.data2 = this.mapArrayToValidationObj(data);
        console.log('%c ***** xxx *****', 'background: #bada55; color: #000; font-weight: bold', this.data2);
    }

    public mapArrayToValidationObj = (array) => {
        const prepareKeys = (val) => R.pipe(
            R.map(key => ({[key]: true})),
            R.mergeAll,
        )(val);
        return R.map(prepareKeys)(array);
    }

    public submitSubscriptionForm = (values) => {
        console.log(values);
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
                ({ graphQLErrors, networkError, message }) => {
                    this.submitSubscriptionLoading = false;
                    console.log('%c ***** error *****', 'background: #bada55; color: #000; font-weight: bold',
                        { graphQLErrors, networkError, message });
                    // this.subscriptionError = this.splitLastPipe.transform(error.message, ':');
                    // this.subscriptionFieldError = {
                    //     'email': [
                    //         'already-registered-email',
                    //     ],
                    // };
                    // this.subscriptionFieldError = this.data2;
                    if (!R_.isNilOrEmpty(graphQLErrors)) {
                        if (graphQLErrors[0].validationError) {
                            if (graphQLErrors[0].validationError.field) {
                                this.subscriptionFieldError = this.mapArrayToValidationObj(graphQLErrors[0].validationError.field);
                            }
                            if (graphQLErrors[0].validationError.global) {
                                this.subscriptionGlobalError = graphQLErrors[0].validationError.global;
                            }
                        } else {
                            this.subscriptionGlobalError.push(graphQLErrors[0].message);
                        }
                    }
                    if (networkError) {
                        this.subscriptionGlobalError.push(networkError.message);
                    }
                    if (!networkError && !graphQLErrors) {
                        this.subscriptionGlobalError.push(message);
                    }
                    this.error = { graphQLErrors, networkError, message };
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
      "message": "Validation error of type FieldUndefined: Field 'makeRegistrationn' in type 'Mutation' is undefined @ 'makeRegistrationn'",
      "path": null,
      "extensions": null
    }
  ],
  "networkError": null,
  "message": "GraphQL error: Validation error of type FieldUndefined: Field 'makeRegistrationn' in type 'Mutation' is'"
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

{
  "graphQLErrors": [],
  "networkError": {
    "headers": {
      "normalizedNames": {},
      "lazyUpdate": null
    },
    "status": 404,
    "statusText": "Not Found",
    "url": "http://localhost:4200/graphqld",
    "ok": false,
    "name": "HttpErrorResponse",
    "message": "Http failure response for http://localhost:4200/graphqld: 404 Not Found",
    "error": {
      "timestamp": "2019-04-09T16:39:35.512+0000",
      "status": 404,
      "error": "Not Found",
      "message": "No message available",
      "path": "/graphqld"
    }
  },
  "message": "Network error: Http failure response for http://localhost:4200/graphqld: 404 Not Found"
}

*/
