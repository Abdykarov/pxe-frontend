import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';
import { ValueOfFormPipe } from 'src/common/pipes/value-of-form/value-of-form.pipe';

@Component({
    selector: 'pxe-user-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public formValues = null;

    public oldPhone = '';
    public smsSent = false;
    public phoneNumber = '';

    constructor(
        private authService: AuthService,
        protected fb: FormBuilder,
        private valueOfFormPipe: ValueOfFormPipe,
    ) {
        super(fb);
        this.oldPhone = this.authService.currentUserValue.phoneNumber;
    }

    ngOnInit() {
        super.ngOnInit();

        this.form.get('phone')
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                this.phoneNumber = this.valueOfFormPipe.transform(this.form, ['phonePrefix', 'phone']);
                this.smsSent = false;
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

    public processSaveButton = (event) => {
        if (this.oldPhone !== this.phoneNumber && !this.smsSent || R.path('resend', event)) {
            this.customAction.emit(this.form.value.phone);
            this.smsSent = true;
        } else {
            this.submitValidForm(event);
        }
    }

    public submitValidForm = (event) => {
        const form: IPersonalDataInputForm = {
            ...this.form.value,
            smsCode: R.path('smsCode', event) ? R.path('smsCode', event) : '',
            phoneNumber: R.concat(CONSTS.TELEPHONE_PREFIX_CZ, this.form.value.phone),
        };
        this.submitAction.emit(form);
    }
}
