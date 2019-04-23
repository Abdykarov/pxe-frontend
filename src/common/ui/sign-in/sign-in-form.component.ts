import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
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
    selector: 'pxe-sign-in-form',
    templateUrl: './sign-in-form.component.html',
    styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
    @Input()
    public signInFormSent = false;

    @Input()
    public signInFormFields: IForm;

    @Input()
    public submitSignInFormLoading = false;

    @Input()
    public signInGlobalError: string[] = null;

    @Input()
    public signInFieldError: IFieldError = {} = null;

    @Output()
    public submitSignInForm: EventEmitter<any> = new EventEmitter<any>();

    public signInForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.signInForm = this.fb.group(this.signInFormFields.controls);
    }

    public submitForm = () => {
        console.log('SUBMITTING');
        R.pipe(
            R.keys,
            R.map((field) => {
                this.signInForm
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(this.signInForm.controls);
        console.log(this.signInForm);
        console.log(this.signInForm.valid);
        if (this.signInForm.valid) {
            console.log('JSEM VALIDNI');
            this.submitSignInForm.emit(this.signInForm.value);
        }
    }
}
