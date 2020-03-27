import {
    FormBuilder,
    Validators,
} from '@angular/forms';
import {
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

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
    TypeOfAnnualConsumptionUnitMapping,
    UNIT_OF_PRICES,
} from 'src/app/app.constants';
import {
    CommodityType,
    ICodelistOptions,
} from 'src/common/graphql/models/supply.model';
import { ICommodityTypeFields } from 'src/common/containers/form/models/form-definition.model';

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
        } else {
            this.setDisableField('annualConsumptionNT');
        }
    }

    public normalizationAnnualConsumption = (annualConsumption: string | number): string =>
        annualConsumption && annualConsumption.toString().replace('.', ',')

    public detectChangesForAnnualConsumption = (
        typeOfAnnualConsumption: ANNUAL_CONSUMPTION_TYPES,
        typeOfAnnualConsumptionUnit: ANNUAL_CONSUMPTION_UNIT_TYPES,
        annualConsumptionUnit: UNIT_OF_PRICES,
    ) => {
        this[TypeOfAnnualConsumptionUnitMapping[typeOfAnnualConsumptionUnit]] = annualConsumptionUnit;
        const annualAnnualConsumption = this.form.controls[typeOfAnnualConsumption].value;
        if (annualConsumptionUnit === UNIT_OF_PRICES.KWH) {
            this.form.controls[typeOfAnnualConsumption]
                .setValidators(
                    [
                        Validators.required,
                        CustomValidators.isNumber(),
                        CustomValidators.minValue(0),
                        CustomValidators.totalDigitLengthBeforeDecimalPoint(
                            CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_ANNUAL_CONSUMPTION,
                        ),
                    ]);
            const typeOfAnnualConsumptionValue = this.operationOnNumber(annualAnnualConsumption, (num) => num * 1000);
            this.form.controls[typeOfAnnualConsumption].setValue(typeOfAnnualConsumptionValue);
        } else {
            this.form.controls[typeOfAnnualConsumption]
                .setValidators(
                    [
                        Validators.required,
                        CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_ANNUAL_CONSUMPTION),
                        CustomValidators.minValue(0),
                        CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
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
