import {
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

import { AbstractComponent } from 'src/common/abstract.component';
import {
    IFieldError,
    IForm,
} from './models/form-definition.model';

export class AbstractFormComponent extends AbstractComponent implements OnInit, OnChanges {
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
    public customAction?: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public submitAction: EventEmitter<any> = new EventEmitter<any>();

    public form: FormGroup;
    public formError: any = {};

    constructor(
        protected fb: FormBuilder,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.form = this.fb.group(this.formFields.controls);
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.fieldError) {
            this.formError = R.clone(changes.fieldError.currentValue);
        }
    }

    public handleCustomAction = ($event) => this.customAction.emit($event);

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            this.submitAction.emit(this.form.value);
        }
    }

    public resetFormError = () => {
        this.resetCustomFieldError();
        R.pipe(
            R.keys,
            R.map((field) => {
                const fieldControl = this.form.get(field);
                fieldControl.markAsUntouched({
                    onlySelf: true,
                });
                fieldControl.setErrors(null);
            }),
        )(this.form.controls);
    }

    public triggerValidation = () => {
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
    }

    public resetFieldValue = (field) => {
        this.form.get(field).setValue(null);
    }

    public resetCustomFieldError = () => {
        R.mapObjIndexed((_, field) => {
            if (this.formError && this.formError[field]) {
                delete this.formError[field];
            }
        })(this.formFields.controls);
    }
}
