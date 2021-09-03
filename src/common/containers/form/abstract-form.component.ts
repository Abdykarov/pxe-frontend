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
    Validators,
} from '@angular/forms';

import * as R from 'ramda';
import { BehaviorSubject } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import {
    isUserName,
    scrollToWithOffset,
} from 'src/common/utils';
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

    public fieldWrapperFocused$: BehaviorSubject<any> = new BehaviorSubject(null);
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

    public setLoginValidator = (formName, $event) => {
        this.form.controls[formName]
            .setValidators(
                [
                    Validators.required,
                    Validators.maxLength(isUserName($event.target.value) ?
                        CONSTS.VALIDATORS.MAX_LENGTH.EMAIL_LOGIN : CONSTS.VALIDATORS.MAX_LENGTH.USER_NAME_LOGIN),
                ]);
        this.form.controls[formName]
            .updateValueAndValidity();
    }

    public submitForm = (event = null) => {
        if (event) {
            event.target.blur();
        }
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            this.submitValidForm();
        } else {
            setTimeout(() => {
                scrollToWithOffset('.invalid-input', CONSTS.OFFSET_ERRORS.INVALID_INPUT);
            });
        }
    }

    public submitValidForm = (customParam = null) => {
        this.submitAction.emit(this.form.value);
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
        this.triggerValidationOnForm(this.form);
    }

    public triggerValidationOnForm = (form) => {
        R.pipe(
            R.keys,
            R.map((field) => {
                if (this.form.get(field) instanceof FormGroup) {
                    this.triggerValidationOnForm(this.form.get(field));
                } else if (this.form.get(field) instanceof FormArray) {
                    R.map((formGroup) => {
                        this.triggerValidationOnForm(formGroup);
                    }, this.form.get(field)['controls']);
                } else {
                    form.get(field)
                        .markAsTouched({
                            onlySelf: true,
                        });
                }
            }),
        )(form.controls);
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

    public fieldWrapperFocus = (name: string) => {
        this.fieldWrapperFocused$.next(name);
    }

    public fieldWrapperBlur = () => {
        this.fieldWrapperFocused$.next(null);
    }

    public submitCustomActionValidFormForm = (data = null) => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            this.customAction.emit({
                value: this.form.value,
                data,
            });
        } else {
            setTimeout(() => {
                scrollToWithOffset('.invalid-input', CONSTS.OFFSET_ERRORS.INVALID_INPUT);
            });
        }
    }
}
