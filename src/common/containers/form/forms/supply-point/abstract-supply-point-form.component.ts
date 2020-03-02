import {
    FormBuilder,
} from '@angular/forms';
import {
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';

import * as R from 'ramda';
import { CODE_LIST } from 'src/app/app.constants';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
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
        if (this.includesBothTariffs(distributionRateId, codeLists)) {
            this.setEnableField('annualConsumptionNT');
        } else {
            this.setDisableField('annualConsumptionNT');
        }
    }

    public includesBothTariffs = (id: string, codeLists: ICodelistOptions = null) => codeLists &&
        R.includes(
            {
                type: 'DS2P4R',
                code: id,
                description: id,
                help: id,
                __typename: 'CodelistItem',
                key: id,
                value: id,
                label: id,
            },
            codeLists[CODE_LIST.DISTRIBUTION_RATE_BOTH])

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
