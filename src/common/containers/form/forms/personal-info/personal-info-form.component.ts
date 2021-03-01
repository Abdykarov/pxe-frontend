import {
    AfterViewInit,
    Component,
    Input,
    OnDestroy,
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
import { AddressWhispererComponent } from 'src/common/containers/address-whisperer/address-whisperer.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CODE_LIST,
    CONSTS,
} from 'src/app/app.constants';
import {
    convertDateToSendFormatFnc,
    CustomValidators,
} from 'src/common/utils';
import {
    ICodelistOption,
    ICodelistOptions,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import {
    IPersonalData,
    IPersonalDataInputForm,
} from 'src/common/graphql/models/personal-data.model';
import { PersonalInfoLocalStorageService } from 'src/app/services/personal-info-local-storage.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';

@Component({
    selector: 'pxe-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent extends AbstractFormComponent implements OnInit, AfterViewInit, OnDestroy {

    public readonly MAX_LENGTH_NUMBER_INPUT_WITH_HINT = CONSTS.VALIDATORS.MAX_LENGTH.NUMBER_INPUT_WITH_HINT;

    @Input()
    public supplyPoint: ISupplyPoint;

    @Input()
    public isIndividual = false;

    @Input()
    public formValues: IPersonalData = null;

    @Input()
    public codeLists: ICodelistOptions;

    public depositPaymentTypeId: ICodelistOption;
    public maxDate: Date = moment().add(-CONSTS.VALIDATORS.ADULTHOOD_AGE, 'years').toDate();
    public minDate: Date = new Date(CONSTS.VALIDATORS.MIN_BIRTH_DATE);

    constructor(
        private authService: AuthService,
        protected fb: FormBuilder,
        private personalInfoLocalStorageService: PersonalInfoLocalStorageService,
        public sAnalyticsService: SAnalyticsService,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.sAnalyticsService.sFormStart();
        this.setForm();
        this.depositPaymentTypeId = this.codeLists[CODE_LIST.DEPOSIT_PAYMENT_TYPE];
        const filteredValuesOfDefaultType = R.filter(
            (depositType) => depositType.value === CONSTS.DEFAULT_DEPOSIT_PAYMENT_TYPE_ID,
            this.depositPaymentTypeId,
        );

        if (filteredValuesOfDefaultType.length) {
            this.form.controls['depositPaymentTypeId'].setValue(CONSTS.DEFAULT_DEPOSIT_PAYMENT_TYPE_ID);
        }

        this.form.get('onlyAddress1').valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((onlyAddress1: boolean) => {
                this.setAddress2(onlyAddress1);
            });

        if (R.path(['contract', 'offer', 'totalPrice'], this.supplyPoint) > 0) {
            this.form.controls['deposit']
                .setValidators(
                    [
                        Validators.required,
                        CustomValidators.isNumber(),
                        CustomValidators.minValue(
                            Math.ceil(this.supplyPoint.contract?.offer?.totalPrice),
                            true,
                            false,
                        ),
                        CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
                    ]);
        }

        if (this.formValues) {
            this.prefillFormData();
        } else {
            const email = this.authService.currentUserValue.email;
            const deposit = this.supplyPoint.contract?.offer?.totalPrice;
            this.form.controls['email'].setValue(email);
            this.form.controls['deposit'].setValue(Math.ceil(deposit));

            let personalInfoUnfinished = this.personalInfoLocalStorageService.getPersonalInfo(this.supplyPoint.id);
            if (personalInfoUnfinished && !R.isEmpty(personalInfoUnfinished)) {
                if (personalInfoUnfinished.birthDate) {
                    personalInfoUnfinished.birthDate = new Date(personalInfoUnfinished.birthDate);
                }
                personalInfoUnfinished = AddressWhispererComponent.removeAddressNotFoundUnique(personalInfoUnfinished);
                this.form.setValue(personalInfoUnfinished);
            }

            this.form.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe(_ => {
                    this.personalInfoLocalStorageService.addPersonalInfo(this.supplyPoint.id, this.form.getRawValue());
                });
        }
    }

    ngAfterViewInit() {
        if (R.path(['contract', 'offer', 'totalPrice'], this.supplyPoint) > 0 && this.formValues) {
            const depositControl = this.form.controls['deposit'];
            const depositControlValue = depositControl.value;
            if (!R.isNil(depositControlValue)) {
                depositControl.patchValue(depositControl.value);
                depositControl.updateValueAndValidity({onlySelf: true, emitEvent: true});
            }
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
        let signatoryPosition = null;
        let signatoryName = null;
        let signatorySurname = null;
        let phone = null;
        let email = null;
        let depositPaymentTypeId = null;
        let deposit = null;
        let address1 = null;
        let address2 = null;

        if (this.formValues) {
            name = this.formValues.name;
            if (this.formValues.birthDate) {
                birthDate = new Date(this.formValues.birthDate);
            }
            signatoryPosition = this.formValues.signatoryPosition;
            signatoryName = this.formValues.signatoryName;
            signatorySurname = this.formValues.signatorySurname;
            ico = this.formValues.ico;
            dic = this.formValues.dic;
            onlyAddress1 = this.formValues.address2;
            bankAccountNumber = this.formValues.bankAccountNumber;
            bankCode = this.formValues.bankCode;
            phone = this.formValues.phone && this.formValues.phone.substr(4, 10);
            email = this.formValues.email;
            depositPaymentTypeId = this.formValues.depositPaymentType && this.formValues.depositPaymentType.code;
            deposit = Math.ceil(this.formValues.deposit);
            address1 = this.formValues.address1 && R.omit(['__typename'], this.formValues.address1);
            address2 = this.formValues.address2 && R.omit(['__typename'], this.formValues.address2);
        }

        this.form.controls['name'].setValue(name);
        this.form.controls['birthDate'].setValue(birthDate);
        this.form.controls['ico'].setValue(ico);
        this.form.controls['dic'].setValue(dic);
        this.form.controls['onlyAddress1'].setValue(onlyAddress1);
        this.form.controls['bankAccountNumber'].setValue(bankAccountNumber);
        this.form.controls['bankCode'].setValue(bankCode);
        this.form.controls['phone'].setValue(phone);
        this.form.controls['email'].setValue(email);
        this.form.controls['depositPaymentTypeId'].setValue(depositPaymentTypeId);
        if (deposit) {
            this.form.controls['deposit'].setValue(deposit);
        }
        this.form.controls['address1'].setValue(address1);
        this.form.controls['signatoryName'].setValue(signatoryName);
        this.form.controls['signatorySurname'].setValue(signatorySurname);
        this.form.controls['signatoryPosition'].setValue(signatoryPosition);
        if (this.form.controls['onlyAddress1'].value) {
            this.form.controls['address2'].setValue(address2);
        }

        this.resetFormError(false);
    }

    public setForm = () => {
        this.setAddress2(false);
        if (this.isIndividual) {
            this.setDisableField('signatoryPosition');
            this.setDisableField('signatoryName');
            this.setDisableField('signatorySurname');
            this.setDisableField('ico');
            this.setDisableField('dic');
            this.setEnableField('birthDate');
        } else {
            this.setEnableField('signatoryPosition');
            this.setEnableField('signatoryName');
            this.setEnableField('signatorySurname');
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

    public submitValidForm = () => {
        const form: IPersonalDataInputForm = {
            ...this.form.value,
            phone: R.concat(CONSTS.TELEPHONE_PREFIX_CZ, this.form.value.phone),
            deposit: parseFloat(String(this.form.value.deposit).replace(',', '.')),
        };
        if (form.birthDate) {
            form.birthDate = convertDateToSendFormatFnc(this.form.value.birthDate);
        }
        delete form.phonePrefix;
        delete form['address1' + AddressWhispererComponent.UNIQUE_FIELD_NAME_END];
        delete form['address2' + AddressWhispererComponent.UNIQUE_FIELD_NAME_END];
        delete form.phonePrefix;
        delete form.onlyAddress1;
        this.submitAction.emit(form);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
