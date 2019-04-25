import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';

import { commodityTypeFields } from './supply-point-form.config';
import { commodityTypes } from './models/supply-point.model';
import {
    IFieldError,
    IForm,
} from '../models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

@Component({
    selector: 'pxe-supply-point-form',
    templateUrl: './supply-point-form.component.html',
    styleUrls: ['./supply-point-form.component.scss'],
})
export class SupplyPointFormComponent implements OnInit, OnChanges {
    @Input()
    public formSent = false;

    @Input()
    public formFields: IForm;

    @Input()
    public formLoading = false;

    @Input()
    public globalError: string[] = null;

    @Input()
    public fieldError: IFieldError = {};

    @Output()
    public submitAction: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public formError: any = {};
    public commodityTypes = commodityTypes;

    public commodityTypeOptions: Array<IOption> = [
        {
            key: commodityTypes.ELECTRICITY,
            label: 'elektřina',
        },
        {
            key: commodityTypes.GAS,
            label: 'plyn',
        },
    ];

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.form = this.fb.group(this.formFields.controls);

        this.form.get('commodityType').valueChanges.subscribe(val => {
            this.switchCommodity(val);
        });
        this.switchCommodity(commodityTypes.ELECTRICITY);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fieldError) {
            this.formError = R.clone(changes.fieldError.currentValue);
        }
    }

    public switchCommodity = (commodityType: commodityTypes) => {
        R.mapObjIndexed((fields, type) => {
            if (commodityTypeFields[type]) {
                if (type === commodityType) {
                    R.map((field) => {
                        this.form
                            .get(field)
                            .enable();
                    }, fields);
                } else {
                    R.map((field) => {
                        this.form
                            .get(field)
                            .disable();
                    }, fields);
                }
            }
        }, commodityTypeFields);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        R.pipe(
            R.keys,
            R.map((field) => {
                this.form
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(this.form.controls);
        if (this.form.valid) {
            this.submitAction.emit(this.form.value);
        }
    }

    public resetForm = () => {
        this.resetCustomFieldError();
        R.pipe(
            R.keys,
            R.map((field) => {
                this.form
                    .get(field)
                    .setErrors(null);
            }),
        )(this.form.controls);
        // this.form.reset();
    }

    public resetCustomFieldError = () => {
        R.mapObjIndexed((_, field) => {
            delete this.formError[field];
        })(this.formFields.controls);
    }
}
