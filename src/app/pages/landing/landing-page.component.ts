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
    takeUntil,
    map,
} from 'rxjs/operators';
import * as R from 'ramda';

import * as queries from 'src/common/graphql/queries';
import * as mutations from 'src/common/graphql/mutations';
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { loginFormFields } from './landing-page.config';
import { OverlayService } from '../../../common/graphql/services/overlay.service';

interface ICounterResponse {
    counter: {
        current: number;
    };
}

interface IVisiblityResponse {
    visibility: {
        current: boolean;
    };
}

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

    public counter = 0;
    public visible = false;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private overlayService: OverlayService,
        private fb: FormBuilder,
        private router: Router,
    ) {
        super();
        this.loginForm = this.fb.group(loginFormFields);
    }

    ngOnInit() {

        this.apollo
            .watchQuery<ICounterResponse>({
                query: queries.getCurrentCounter,
            })
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                map(result => result.data && result.data.counter && result.data.counter.current),
            )
            .subscribe(current => {
                console.log('%c ***** counter *****', 'background: #bada55; color: #000; font-weight: bold', current);
                this.counter = current;
            });

        this.apollo
            .watchQuery<IVisiblityResponse>({
                query: queries.getVisibility,
            })
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                map(result => result.data && result.data.visibility && result.data.visibility.current),
            )
            .subscribe(current => {
                console.log('%c ***** visibility *****', 'background: orange; color: #000; font-weight: bold', current);
                this.visible = current;
            });

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
                console.log('%c ***** result *****', 'background: #bada55; color: #000; font-weight: bold', result);
                this.rates = result.data;
                this.loading = result.loading;
                this.errors = result.errors;
                this.cd.markForCheck();
            });
    }

    public incrementCounter = () => {
        this.apollo
            .mutate({
                mutation: mutations.incrementCounter,
            })
            .subscribe();
    }


    public decrementCounter = () => {
        this.apollo
            .mutate({
                mutation: mutations.decrementCounter,
            })
            .subscribe();
    }

    public resetCounter = () => {
        this.apollo
            .mutate({
                mutation: mutations.resetCounter,
            })
            .subscribe();
    }

    public toggleVisibility = () => {
        this.apollo
            .mutate({
                mutation: mutations.toggleVisibility,
                variables: {
                    visibility: !this.visible,
                },
            })
            .subscribe();
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
                .subscribe((a) => {
                    this.router.navigate(['/secured']);
                });
        }
    }


    public toggleLoginDialog = () => {
        if (!this.loginLoading) {
            this.showLogin = !this.showLogin;
            this.overlayService.toggleOverlay()
                .pipe(
                    takeUntil(this.destroy$),
                ).subscribe();
        }
    }
}
