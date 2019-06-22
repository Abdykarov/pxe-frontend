import {
    FormBuilder,
} from '@angular/forms';
import {
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import {
    CommodityType,
    DistributionType,
} from 'src/common/graphql/models/supply.model';
import { DISTRIBUTION_RATES_TYPE_DEFINITION } from 'src/app/app.constants';
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

    public setAnnualConsumptionNTState = (distributionRateId: string = null) => {
        const annualConsumptionNTControl = this.form.get('annualConsumptionNT');
        if (this.includesBothTariffs(distributionRateId)) {
            annualConsumptionNTControl.enable();
        } else {
            annualConsumptionNTControl.disable();
        }
    }

    public includesBothTariffs = (id: string) => DISTRIBUTION_RATES_TYPE_DEFINITION[DistributionType.BOTH].includes(id);

    public setFormFields = (commodityType: CommodityType) => {
        R.mapObjIndexed((fieldControl, field: string) => {
            if (R.indexOf(field, this.allowedFields[commodityType]) >= 0) {
                fieldControl.enable({
                    emitEvent: false,
                });
            } else {
                fieldControl.disable({
                    emitEvent: false,
                });
            }
        }, this.form.controls);
    }
}
