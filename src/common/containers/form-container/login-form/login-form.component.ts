import {
    ActivatedRoute,
    Router,
} from '@angular/router';
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
import { takeUntil } from 'rxjs/operators';

import { IForm } from '../models/form-definition.model';
import { AbstractComponent } from 'src/common/abstract.component';

@Component({
    selector: 'pxe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends AbstractComponent implements OnInit {
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

    public isFromSignUp = false;
    public email = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.loginForm = this.fb.group(this.loginFormFields.controls);
        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.email = params['email'];
                if (this.email) {
                    const formValue = this.loginForm.value;
                    formValue.username = this.email;
                    this.loginForm.setValue(formValue);
                }
            });
        this.isFromSignUp = !!window.history.state.isFromSignUp;
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
            this.isFromSignUp = false;
            this.submitLoginForm.emit(this.loginForm.value);
        }
    }

    public action(evt) {
        evt.preventDefault();
        window.open('/forgotten-password');
    }
}
