import {
    Component,
    Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent extends AbstractFormComponent {

    @Input()
    public contractTemplate;

    @Input()
    public personData: IPersonalData;

    @Input()
    public smsSent: number = null;

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
