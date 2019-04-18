import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { loginFormFields } from './login-page.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

@Component({
    selector: 'lnd-login',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginComponent extends AbstractComponent {
    public loginError = false;
    public loginForm: FormGroup;
    public loginLoading = false;
    public loginType = false;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
        this.loginForm = this.fb.group(loginFormFields);
    }

    public submitLoginForm = () => {
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
            this.loginLoading = true;
            this.loginError = false;
            this.authService
                .login(this.loginForm.value)
                .subscribe(
                    () => {
                        this.router.navigate(['/secured']);
                    },
                    error => {
                        this.loginError = true;
                        this.loginLoading = false;
                        this.cd.markForCheck();
                    });
        }
    }

    public toggleLoginDialog = () => {
        if (!this.loginLoading) {
            this.loginType = !this.loginType;
            this.overlayService.toggleOverlay()
                .pipe(
                    takeUntil(this.destroy$),
                )
                .subscribe();
        }
    }
}
