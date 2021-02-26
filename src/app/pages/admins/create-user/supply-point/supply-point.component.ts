import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

import * as R from 'ramda';

import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { SUPPLY_POINT_EDIT_TYPE } from 'src/app/app.constants';
import {ActivatedRoute, Router} from '@angular/router';

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
    public askForOfferId = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
        this.askForOfferId = route.snapshot.queryParams.id;

        this.formFields.controls = R.mapObjIndexed((a, field) => {
            const [defaultValue, validators] = a;
            let aaa = [];
            if (validators) {
                aaa = R.reject(fc => fc.toString() === Validators.required.toString())(validators);
            }
            return [defaultValue, aaa];
        })({...this.formFields.controls});
    }

    public save = (data) => {
        this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_RECAPITULATION], {
            queryParams: {
                id: this.askForOfferId,
            },
        });
    }
}
