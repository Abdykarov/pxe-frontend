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
    ICodelistOptions,
} from 'src/common/graphql/models/supply.model';
import { ICommodityTypeFields } from 'src/common/containers/form/models/form-definition.model';
import { includesBothTariffs } from 'src/common/utils';

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
