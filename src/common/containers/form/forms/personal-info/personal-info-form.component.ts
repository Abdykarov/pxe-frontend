import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    FormBuilder,
    Validators,
} from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AddressWhispererComponent } from 'src/common/containers/address-whisperer/address-whisperer.component';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { depositPaymentType } from './personal-info-form.config';
import {
    IPersonalData,
    IPersonalDataInputForm,
} from 'src/common/graphql/models/personal-data.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { CustomValidators } from 'src/common/utils';

@Component({
    selector: 'pxe-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public supplyPoint: ISupplyPoint;

    @Input()
    public isIndividual = false;

    @ViewChild('address1')
    public address1LndSelect: AddressWhispererComponent;

    @ViewChild('address2')
    public address2LndSelect: AddressWhispererComponent;

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
    }

    public prefillFormData = (personalData: IPersonalData) => {
        const phone = personalData.phone && personalData.phone.substr(4, 10);
        const phonePrefix = '+420';
        const onlyAddress1 = !personalData.address2;

        this.form.controls['name'].setValue(personalData.name);
        this.form.controls['ico'].setValue(personalData.ico);
        this.form.controls['dic'].setValue(personalData.dic);

        this.form.controls['onlyAddress1'].setValue(!onlyAddress1);
        this.form.controls['bankAccountNumber'].setValue(personalData.bankAccountNumber);
        this.form.controls['bankCode'].setValue(personalData.bankCode);
        this.form.controls['phone'].setValue(phone);
        this.form.controls['phonePrefix'].setValue(phonePrefix);
        this.form.controls['email'].setValue(personalData.email);
        this.form.controls['depositPaymentTypeId'].setValue(personalData.depositPaymentType.code);
        this.form.controls['deposit'].setValue(personalData.deposit);

        this.address1LndSelect.setValue({
            key: `${personalData.address1.street} ${personalData.address1.descriptiveNumber},
             ${personalData.address1.city}, ${personalData.address1.postCode}`,
            value: personalData.address1,
            label: `${personalData.address1.street} ${personalData.address1.descriptiveNumber},
             ${personalData.address1.city}, ${personalData.address1.postCode}`,
        });

        if (!onlyAddress1) {
            this.address2LndSelect.setValue({
                key: `${personalData.address2.street} ${personalData.address2.descriptiveNumber},
                 ${personalData.address2.city}, ${personalData.address2.postCode}`,
                value: personalData.address2,
                label: `${personalData.address2.street} ${personalData.address2.descriptiveNumber},
                 ${personalData.address2.city}, ${personalData.address2.postCode}`,
            });
        }

        this.resetFormError(false);
    }

    public setForm = () => {
        this.setAddress2(false);
        if (this.isIndividual) {
            this.setDisableField('ico');
            this.setDisableField('dic');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (this.form) {
            this.form.controls['deposit']
                .setValidators(
                    [
                        Validators.required,
                        CustomValidators.isDecimal,
                        CustomValidators.minValue(
                            this.supplyPoint.contract ?
                                (this.supplyPoint.contract.offer.mountlyPaymentPrice) : 0,
                            true,
                        ),
                    ]);
        }
    }

    public setAddress2(onlyAddress1: boolean) {
        if (onlyAddress1) {
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
                phone: this.form.value.phonePrefix + this.form.value.phone,
                deposit: parseFloat(this.form.value.deposit.replace(',', '.')),
            };
            delete form.phonePrefix;
            delete form.onlyAddress1;
            this.submitAction.emit(form);
        }
    }
}
