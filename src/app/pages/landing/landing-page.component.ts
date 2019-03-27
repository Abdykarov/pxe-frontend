import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {
    first,
    takeUntil,
} from 'rxjs/operators';
import * as R from 'ramda';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { loginFormFields } from './landing-page.config';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent extends AbstractComponent implements OnInit {
    public showLogin = false;
    public loginForm: FormGroup;
    public loading = false;
    public errors: any;
    public rates: any;
    public loginLoading = false;
    public loginError = false;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private router: Router,
    ) {
        super();
        this.loginForm = this.fb.group(loginFormFields);
    }

    ngOnInit() {
        this.apollo
            .watchQuery({
                query: gql`
                    {
                        employee(id:1) {
                            firstName
                            address
                        }
                    }
                `,
            })
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(result => {
                this.rates = result.data;
                this.loading = result.loading;
                this.errors = result.errors;
            });
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
            this.loginLoading = true;
            this.loginError = false;
            this.authService
                .login(this.loginForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.loginLoading = false;
                        this.authService.checkLogin();
                        if (this.authService.isLogged()) {
                            this.router.navigate(['/secured/dashboard']);
                        } else {
                            this.loginError = true;
                            this.loginLoading = false;
                        }
                        this.cd.markForCheck();
                    },
                    error => {
                        this.loginError = true;
                        this.loginLoading = false;
                        this.cd.markForCheck();
                    });
        }
    }

    public resetForm = () => {
        R.pipe(
            R.keys,
            R.map((field) => {
                this.loginForm
                    .get(field)
                    .setValue('');
            }),
        )(this.loginForm.controls);
        this.loginForm.reset();
        this.loginError = false;
    }

    public toggleLoginDialog = () => {
        if (!this.loginLoading) {
            this.showLogin = !this.showLogin;
            this.resetForm();
        }
    }
}
