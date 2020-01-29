import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { CONSTS } from 'src/app/app.constants';

@Component({
    selector: 'pxe-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent extends AbstractFormComponent {

    public readonly LOGIN_FORM_NAME = CONSTS.LOGIN_FORM_NAME;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }
}
