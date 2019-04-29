import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-news-subscription',
    templateUrl: './news-subscription.component.html',
    styleUrls: ['./news-subscription.component.scss'],
})
export class NewsSubscriptionComponent extends AbstractFormComponent {
    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const val = this.form.value;
            val.preregistration = true;
            this.submitAction.emit(val);
        }
    }
}

