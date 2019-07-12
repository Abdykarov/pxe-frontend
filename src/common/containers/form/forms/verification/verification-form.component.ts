import {
    Component,
    Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { formFields } from './verification-form.config';
import { IContract } from 'src/common/graphql/models/contract';

@Component({
    selector: 'pxe-verification-form',
    templateUrl: './verification-form.component.html',
    styleUrls: ['./verification-form.component.scss'],
})
export class VerificationFormComponent extends AbstractFormComponent {
    @Input()
    public smsSent: number = null;

    @Input()
    public contract: IContract;

    @Input()
    public classRootWrapper = 'col-12 col-lg-9 offset-lg-3';

    @Input()
    public classMainWrapper = 'row justify-content-between';

    @Input()
    public classFirstField = 'col-md-auto';

    @Input()
    public classSecondField = 'col-md-auto mt-md-4';

    @Input()
    public submitLabelText = 'Podepsat smlouvu';

    @Input()
    public showSentSmsLabelUnderFirstField = true;

    public formFields = formFields;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            this.submitAction.emit(this.form.controls.smsCode.value);
        }
    }

    public submitSms = () => {
        this.resetFormError();
        this.customAction.emit();
    }
}
