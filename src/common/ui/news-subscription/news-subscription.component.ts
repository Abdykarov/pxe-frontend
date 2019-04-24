import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';

import {
    IFieldError,
    IForm,
} from 'src/common/containers/form-container/models/form-definition.model';

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

    @Output()
    openConsentAction: EventEmitter<any> = new EventEmitter<any>();

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

    public openConsent($event) {
        this.openConsentAction.emit($event);
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
            const val = this.subscriptionForm.value;
            val.preregistration = true;
            this.submitSubscriptionForm.emit(val);
        }
    }

    public resetCustomFieldError = () => {
        R.mapObjIndexed((_, field) => {
            delete this.subscriptionFormError[field];
        })(this.subscriptionFormFields.controls);
    }
}
0;
