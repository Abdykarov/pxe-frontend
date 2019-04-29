import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends AbstractFormComponent {
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
            val.preregistration = false;
            this.submitAction.emit(val);
        }
    }
}
