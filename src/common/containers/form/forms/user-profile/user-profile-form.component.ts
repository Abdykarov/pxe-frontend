import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { CONSTS } from 'src/app/app.constants';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-user-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public formValues = null;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.prefillForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.formValues && this.form) {
            this.prefillForm();
        }
    }

    public prefillForm = () => {
        this.form.get('email').setValue(this.formValues.email);
        this.form.get('firstName').setValue(this.formValues.firstName);
        this.form.get('lastName').setValue(this.formValues.lastName);

        const phone = this.formValues.phoneNumber && this.formValues.phoneNumber.indexOf(CONSTS.TELEPHONE_PREFIX_CZ) >= 0 ?
            this.formValues.phoneNumber.substr(4, 10) : this.formValues.phoneNumber;
        this.form.get('phone').setValue(phone);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form: IPersonalDataInputForm = {
                ...this.form.value,
                phoneNumber: R.concat(CONSTS.TELEPHONE_PREFIX_CZ, this.form.value.phone),
            };
            this.submitAction.emit(form);
        }
    }
}
