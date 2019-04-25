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

import {
    IFieldError,
    IForm,
} from 'src/common/containers/form-container/models/form-definition.model';

@Component({
    selector: 'pxe-sign-up-form',
    templateUrl: './sign-up-form.component.html',
    styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit, OnChanges {
    @Input()
    public signUpFormSent = false;

    @Input()
    public signUpFormFields: IForm;

    @Input()
    public submitSignUpFormLoading = false;

    @Input()
    public signUpGlobalError: string[] = null;

    @Input()
    public signUpFieldError: IFieldError = {};

    @Output()
    public submitSignUpForm: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    openConsentAction: EventEmitter<any> = new EventEmitter<any>();

    public signUpForm: FormGroup;
    public signUpFormError: any = {};

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.signUpForm = this.fb.group(this.signUpFormFields.controls);
    }

    public openConsent($event) {
        this.openConsentAction.emit($event);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.signUpFieldError) {
            this.signUpFormError = R.clone(changes.signUpFieldError.currentValue);
        }
    }

    public submitForm = () => {
        R.pipe(
            R.keys,
            R.map((field) => {
                this.signUpForm
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(this.signUpForm.controls);
        if (this.signUpForm.valid) {
            const val = this.signUpForm.value;
            val.preregistration = false;
            this.submitSignUpForm.emit(val);
        }
    }
    public resetCustomFieldError = () => {
        R.mapObjIndexed((_, field) => {
            delete this.signUpFormError[field];
        })(this.signUpFormFields.controls);
    }
}
