import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import * as R from 'ramda';

import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { SUPPLY_POINT_EDIT_TYPE } from 'src/app/app.constants';

@Component({
    selector: 'pxe-create-user-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent {
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public supplyPointData: any = {};


    constructor() {
        super();
        this.formFields.controls = R.mapObjIndexed((a, field) => {
            const [defaultValue, validators] = a;
            let aaa = [];
            if (validators) {
                aaa = R.reject(fc => fc.toString() === Validators.required.toString())(validators);
            }
            return [defaultValue, aaa];
        })({...this.formFields.controls});
    }
}
