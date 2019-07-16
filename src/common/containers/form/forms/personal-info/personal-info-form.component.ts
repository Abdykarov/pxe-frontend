import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import {
    FormBuilder,
    Validators,
} from '@angular/forms';

import * as moment from 'moment';
import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { CONSTS } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { depositPaymentType } from './personal-info-form.config';
import {
    IPersonalData,
    IPersonalDataInputForm,
} from 'src/common/graphql/models/personal-data.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent extends AbstractFormComponent implements OnInit {

    @Input()
    public supplyPoint: ISupplyPoint;

    @Input()
    public isIndividual = false;

    @Input()
    public formValues: IPersonalData = null;

    public maxDate: Date = moment().add(-CONSTS.ADULTHOOD_AGE, 'years').toDate();
    public depositPaymentTypeId = depositPaymentType;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.setForm();

        this.form.get('onlyAddress1')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((onlyAddress1: boolean) => {
                this.setAddress2(onlyAddress1);
            });

        if (this.formValues) {
            this.prefillFormData();
        }

        if (this.supplyPoint.contract && this.supplyPoint.contract.offer && this.supplyPoint.contract.offer.mountlyPaymentPrice > 0) {
            this.form.controls['deposit']
                .setValidators(
                    [
                        Validators.required,
                        CustomValidators.isNumber(2),
                        CustomValidators.minValue(this.supplyPoint.contract.offer.mountlyPaymentPrice,
                            true,
                            false,
                        ),
                    ]);
        }
    }

    public prefillFormData = () => {
        let name = null;
        let birthDate = null;
        let ico = null;
        let dic = null;
        let onlyAddress1 = null;
        let bankAccountNumber = null;
        let bankCode = null;
        let phone = null;
        let email = null;
        let depositPaymentTypeId = null;
        let deposit = null;
        let address1 = null;
        let address2 = null;

        if (this.formValues) {
            name = this.formValues.name;
            birthDate = this.formValues.birthDate;
            ico = this.formValues.ico;
            dic = this.formValues.dic;
            onlyAddress1 = !this.formValues.address2;
            bankAccountNumber = this.formValues.bankAccountNumber;
            bankCode = this.formValues.bankCode;
            phone = this.formValues.phone && this.formValues.phone.substr(4, 10);
            email = this.formValues.email;
            depositPaymentTypeId = this.formValues.depositPaymentType && this.formValues.depositPaymentType.code;
            deposit = this.formValues.deposit;
            address1 = this.formValues.address1 && R.omit(['__typename'], this.formValues.address1);
            address2 = this.formValues.address2 && R.omit(['__typename'], this.formValues.address2);
        }

        this.form.controls['name'].setValue(name);
        this.form.controls['birthDate'].setValue(birthDate);
        this.form.controls['ico'].setValue(ico);
        this.form.controls['dic'].setValue(dic);
        this.form.controls['onlyAddress1'].setValue(!onlyAddress1);
        this.form.controls['bankAccountNumber'].setValue(bankAccountNumber);
        this.form.controls['bankCode'].setValue(bankCode);
        this.form.controls['phone'].setValue(phone);
        this.form.controls['email'].setValue(email);
        this.form.controls['depositPaymentTypeId'].setValue(depositPaymentTypeId);
        this.form.controls['deposit'].setValue(deposit);
        this.form.controls['address1'].setValue(address1);
        this.form.controls['address2'].setValue(address2);

        this.resetFormError(false);
    }

    public setForm = () => {
        this.setAddress2(false);
        if (this.isIndividual) {
            this.setDisableField('ico');
            this.setDisableField('dic');
            this.setEnableField('birthDate');
        } else {
            this.setEnableField('ico');
            this.setEnableField('dic');
            this.setDisableField('birthDate');
        }
    }

    public setAddress2(val) {
        if (val) {
            this.setEnableField('address2');
        } else {
            this.setDisableField('address2');
        }
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form: IPersonalDataInputForm = {
                ...this.form.value,
                phone: R.concat(this.form.value.phonePrefix, this.form.value.phone),
                deposit: parseFloat(String(this.form.value.deposit).replace(',', '.')),
            };
            if (form.birthDate) {
                form.birthDate = this.form.value.birthDate.toISOString().split('T')[0];
            }
            delete form.phonePrefix;
            delete form.onlyAddress1;
            this.submitAction.emit(form);
        }
    }
}
