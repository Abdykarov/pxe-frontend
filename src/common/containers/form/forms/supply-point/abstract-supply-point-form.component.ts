import {
    FormBuilder,
    Validators,
} from '@angular/forms';
import { OnChanges, OnInit, SimpleChanges, Directive } from '@angular/core';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    anyToString,
    CustomValidators,
    includesBothTariffs,
} from 'src/common/utils';
import {
    ANNUAL_CONSUMPTION_TYPES,
    ANNUAL_CONSUMPTION_UNIT_TYPES,
    CONSTS,
    UNIT_OF_PRICES,
} from 'src/app/app.constants';
import {
    CommodityType,
    ICodelistOptions,
} from 'src/common/graphql/models/supply.model';
import { ICommodityTypeFields } from 'src/common/containers/form/models/form-definition.model';

@Directive()
export class AbstractSupplyPointFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    public allowedFields: ICommodityTypeFields;

    protected constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public setAnnualConsumptionNTState = (distributionRateId: string = null, codeLists: ICodelistOptions = null) => {
        if (includesBothTariffs(distributionRateId, codeLists)) {
            this.setEnableField('annualConsumptionNT');
            this.setEnableField('annualConsumptionNTUnit');
        } else {
            this.setDisableField('annualConsumptionNT');
            this.setDisableField('annualConsumptionNTUnit');
        }
    }

    public normalizationAnnualConsumption = (annualConsumption: string | number): string =>
        annualConsumption && annualConsumption.toString().replace('.', ',')

    public detectChangesForAnnualConsumption = (
        typeOfAnnualConsumption: ANNUAL_CONSUMPTION_TYPES,
        typeOfAnnualConsumptionUnit: ANNUAL_CONSUMPTION_UNIT_TYPES,
        annualConsumptionUnit: UNIT_OF_PRICES,
        withoutValidators = false,
    ) => {
        const annualAnnualConsumption = this.form.controls[typeOfAnnualConsumption].value;
        if (annualConsumptionUnit === UNIT_OF_PRICES.KWH) {
            this.form.controls[typeOfAnnualConsumption]
                .setValidators(
                    [
                        (withoutValidators ? CustomValidators.alwaysValid : Validators.required),
                        CustomValidators.isNumber(),
                        CustomValidators.minValue(0),
                        CustomValidators.totalDigitLengthBeforeDecimalPoint(
                            CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_ANNUAL_CONSUMPTION,
                        ),
                        CustomValidators.maxValue(
                            CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000,
                            true,
                            true,
                            'maxKWh',
                        ),
                    ]);
            const typeOfAnnualConsumptionValue = this.operationOnNumber(annualAnnualConsumption, (num) => num * 1000);
            this.form.controls[typeOfAnnualConsumption].setValue(typeOfAnnualConsumptionValue);
        } else {
            this.form.controls[typeOfAnnualConsumption]
                .setValidators(
                    [
                        (withoutValidators ? CustomValidators.alwaysValid : Validators.required),
                        CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_ANNUAL_CONSUMPTION),
                        CustomValidators.minValue(0),
                        CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
                        CustomValidators.maxValue(
                            CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH,
                            true,
                            true,
                            'maxMWh',
                        ),
                    ]);
            const typeOfAnnualConsumptionValue = this.operationOnNumber(annualAnnualConsumption, (num) => num / 1000);
            this.form.controls[typeOfAnnualConsumption].setValue(typeOfAnnualConsumptionValue);
        }
        this.form.controls[typeOfAnnualConsumption].updateValueAndValidity();
    }

    public operationOnNumber = (number: string | number, fnc: Function): string => {
        if (!number) {
            return '';
        }
        return R.pipe(
            anyToString,
            R.replace(',', '.'),
            parseFloat,
            fnc,
            anyToString,
            R.replace('.', ','),
        )(number);
    }

    public setFormFields = (commodityType: CommodityType) => {
        R.mapObjIndexed((fieldControl, field: string) => {
            if (R.indexOf(field, this.allowedFields[commodityType]) >= 0) {
                this.setEnableField(
                    field,
                    {
                        emitEvent: false,
                    },
                );
            } else {
                this.setDisableField(
                    field,
                    {
                        emitEvent: false,
                    },
                );
            }
        }, this.form.controls);
    }
}
