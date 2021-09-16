import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { CONSTS } from 'src/app/app.constants';
import { IUserProfileModelForm } from 'src/common/containers/form/forms/user-profile/user-profile-form.model';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-user-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public formValues = null;

    @Input()
    public oldPhone = '';

    @Input()
    public smsSent = false;
    public phoneNumber = '';

    public showForm = false;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.form.get('phone')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.phoneNumber = this.getFieldValue('phonePrefix') + '' + this.getFieldValue('phone');
                this.smsSent = false;
                this.showForm = false;
            });

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

    public processSaveButton = (value: IUserProfileModelForm, submitValidFormAction = true) => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            if (this.phoneChanged() && (!submitValidFormAction || !this.smsSent) && this.phoneNumber) {
                this.customAction.emit(this.form.value.phone);
            } else {
                this.submitValidForm(value);
            }
        }
    }

    public submitValidForm = (smsCode) => {
        const form: IPersonalDataInputForm = {
            ...this.form.value,
            smsCode,
            phoneNumber: this.phoneNumber,
        };
        this.submitAction.emit(form);
    }

    public phoneChanged = (): boolean => this.oldPhone !== this.phoneNumber;

    public enableVerification = (value: IUserProfileModelForm) => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            if (this.phoneChanged()) {
                this.showForm = true;
            } else {
                this.submitValidForm(value);
            }
        }
    }
}
