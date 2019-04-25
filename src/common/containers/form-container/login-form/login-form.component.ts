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

import { IForm } from '../models/form-definition.model';

@Component({
    selector: 'pxe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
    @Input()
    public loginFormSent = false;

    @Input()
    public loginFormFields: IForm;

    @Input()
    public submitLoginFormLoading = false;

    @Input()
    public loginGlobalError: string[] = null;

    @Output()
    public submitLoginForm: EventEmitter<any> = new EventEmitter<any>();

    public loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group(this.loginFormFields.controls);
    }

    public submitForm = () => {
        R.pipe(
            R.keys,
            R.map((field) => {
                this.loginForm
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(this.loginForm.controls);
        if (this.loginForm.valid) {
                this.submitLoginForm.emit(this.loginForm.value);
        }
    }

    public action(evt) {
        evt.preventDefault();
        window.open('/full/landing-page', '_blank');
    }
}
