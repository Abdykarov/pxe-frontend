import {
    AfterViewInit,
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
import { CustomValidators } from 'src/common/utils';
import { depositPaymentType } from './personal-info-form.config';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';
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

        if (this.supplyPoint.contract && this.supplyPoint.contract.offer && this.supplyPoint.contract.offer.mountlyPaymentPrice > 0) {
            this.form.controls['deposit']
                .setValidators(
                    [
                        Validators.required,
                        CustomValidators.isDecimal,
                        CustomValidators.minValue(this.supplyPoint.contract.offer.mountlyPaymentPrice,
                            true,
                            false,
                        ),
                    ]);
        }

        this.setForm();
    }

    setForm = () => {
        this.setAddress2(false);
        if (this.isIndividual) {
            this.setDisableField('ico');
            this.setDisableField('dic');
        } else {
            this.setEnableField('ico');
            this.setEnableField('dic');
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
                deposit: parseFloat(this.form.value.deposit.replace(',', '.')),
            };
            delete form.phonePrefix;
            delete form.onlyAddress1;
            this.submitAction.emit(form);
        }
    }
}
