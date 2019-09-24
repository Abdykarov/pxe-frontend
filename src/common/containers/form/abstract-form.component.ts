import {
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    FormArray,
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
    public formFields: IForm;

    @Input()
    public formSent = false;

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
    public originalFormValues: any = {};

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

    public resetFormError = (clearError = true) => {
        this.resetCustomFieldError();
        R.pipe(
            R.keys,
            R.map((field) => {
                this.resetFieldError(field, clearError);
            }),
        )(this.form.controls);
    }

    public resetFieldError = (field, clearError) => {
        const fieldControl = this.form.get(field);
        fieldControl.markAsUntouched({
            onlySelf: true,
        });
        if (clearError) {
            fieldControl.setErrors(null);
        }
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

    public triggerValidationCustom = (controls) => {
        R.pipe(
            R.keys,
            R.map((field) => {
                this.form
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(controls);
    }


    public getFieldValue = (fieldName: string) => {
        return this.form.get(fieldName).value;
    }

    public setEnableField = (fieldName: string, opts = {}): void => {
        this.form.get(fieldName).enable(opts);
    }

    public setDisableField = (fieldName: string, opts = {}): void => {
        this.form.get(fieldName).disable(opts);
    }

    public resetFieldValue = (field, clearError = true) => {
        this.form.get(field).patchValue(null);
        this.resetFieldError(field, clearError);
    }

    public resetCustomFieldError = () => {
        R.mapObjIndexed((_, field) => {
            if (this.formError && this.formError[field]) {
                delete this.formError[field];
            }
        })(this.formFields.controls);
    }

    public clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0);
        }
    }

    public setOriginalFormValues = (obj: any) => {
        this.originalFormValues = Object.assign({}, obj);
    }

    public isDifferentField = (prop: string): boolean => this.originalFormValues[prop] !== this.form.value[prop];

    public isDifferentForm = (): boolean => {
        let hasChanges = false;
        for (const prop in this.form.value) {
            if (this.isDifferentField(prop)) {
                hasChanges = true;
            }
        }
        return hasChanges;
    }
}
