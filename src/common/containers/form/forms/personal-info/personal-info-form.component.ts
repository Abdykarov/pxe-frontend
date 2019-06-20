import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    Validators,
} from '@angular/forms';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { depositPaymentType } from './personal-info-form.config';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';
import {
    ISupplyPoint,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
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

    public depositPaymentTypeId = depositPaymentType;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.form.get('onlyAddress1')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.setAddress2(val);
            });

        this.setForm();
    }

    setForm = () => {
        this.setAddress2(false);
        if (this.isIndividual) {
            this.form.get('ico').disable();
            this.form.get('dic').disable();
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
                                (this.supplyPoint.contract.offer.mountlyPaymentPrice - 1) : 0,
                        ),
                    ]);
        }
    }

    public setAddress2(val) {
        const correspondenceAddress = this.form.get('address2');
        if (val) {
            correspondenceAddress.enable();
        } else {
            correspondenceAddress.disable();
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
