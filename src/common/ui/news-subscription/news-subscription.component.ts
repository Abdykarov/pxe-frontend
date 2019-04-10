import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output, SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import {
    IFieldError,
    IForm,
} from './models/form-definition.model';

@Component({
    selector: 'pxe-news-subscription',
    templateUrl: './news-subscription.component.html',
    styleUrls: ['./news-subscription.component.scss'],
})
export class NewsSubscriptionComponent implements OnInit, OnChanges {
    @Input()
    public subscriptionFormSent = false;

    @Input()
    public subscriptionFormFields: IForm;

    @Input()
    public submitSubscriptionLoading = false;

    @Input()
    public subscriptionGlobalError: string[] = null;

    @Input()
    public subscriptionFieldError: IFieldError = {};

    @Output()
    submitSubscriptionForm: EventEmitter<any> = new EventEmitter<any>();

    public subscriptionForm: FormGroup;
    public subscriptionFormError: any = {};

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.subscriptionForm = this.fb.group(this.subscriptionFormFields.controls);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.subscriptionFieldError) {
            this.subscriptionFormError = R.clone(changes.subscriptionFieldError.currentValue);
        }
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        R.pipe(
            R.keys,
            R.map((field) => {
                this.subscriptionForm
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(this.subscriptionForm.controls);
        if (this.subscriptionForm.valid) {
                this.submitSubscriptionForm.emit(this.subscriptionForm.value);
        }
    }

    public resetCustomFieldError = () => {
        R.mapObjIndexed((_, field) => {
            console.log(field);
            delete this.subscriptionFormError[field];
        })(this.subscriptionFormFields.controls);
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
