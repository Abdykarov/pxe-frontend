import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';
import { IForm } from './models/form-definition.model';

@Component({
    selector: 'pxe-news-subscription',
    templateUrl: './news-subscription.component.html',
    styleUrls: ['./news-subscription.component.scss'],
})
export class NewsSubscriptionComponent implements OnInit {
    @Input()
    public subscriptionFormSent = false;

    @Input()
    public subscriptionFormFields: IForm;

    @Input()
    public submitSubscriptionLoading = false;

    @Input()
    public subscriptionError = null;

    @Output()
    submitSubscriptionForm: EventEmitter<any> = new EventEmitter<any>();

    public subscriptionForm: FormGroup;
    public subscriptionFormError: any = {};

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.subscriptionForm = this.fb.group(this.subscriptionFormFields.controls);
        this.subscriptionFormError.email = {};
        this.subscriptionFormError.email['already-registered-email'] = true;
    }

    public submitForm = () => {
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
}
