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
        if (this.includesBothTariffs(distributionRateId)) {
            this.setEnableField('annualConsumptionNT');
        } else {
            this.setDisableField('annualConsumptionNT');
        }
    }

    public includesBothTariffs = (id: string) => DISTRIBUTION_RATES_TYPE_DEFINITION[DistributionType.BOTH].includes(id);

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
