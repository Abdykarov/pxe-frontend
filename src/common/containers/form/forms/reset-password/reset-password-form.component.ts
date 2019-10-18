import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent extends AbstractFormComponent {

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }
}
