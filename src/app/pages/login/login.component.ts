import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import {
    loginFormFields,
    loginSupplyAuthFormFields,
} from 'src/common/containers/form/forms/login/login-form.config';
import { parseRestAPIErrors } from 'src/common/utils/';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent {
    public formLoading = false;
    public globalError: string[] = [];
    public loginFormFields = loginFormFields;
    public loginSmsRequired = false;
    public loginSupplyAuthFields = loginSupplyAuthFormFields;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();
    }

    public submitFormLogin = (values) => {
        this.formLoading = true;
        this.authService
            .login(values)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    const isSupplier = this.authService.isSupplier();
                    if (isSupplier) {
                        this.sendSupplierLoginSms();
                    } else {
                        this.formLoading = false;
                        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
                    }
                },
                error => {
                    this.handleError(error);
                });

    }

    public submitSupplierLoginSms = (values) => {
        this.formLoading = true;
        this.authService
            .confirmSupplierLoginSms(values)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER]);
                },
                error => {
                    this.handleError(error);
                });
    }


    public forgottenPasswordAction = ($event) => {
        $event.preventDefault();
        window.open(CONSTS.PATHS.FORGOTTEN_PASSWORD);
    }

    public sendSupplierLoginSms() {
        this.formLoading = true;
        this.authService
            .sendSupplierLoginSms()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                res => {
                    this.formLoading = false;
                    this.loginSmsRequired = true;
                    this.cd.markForCheck();
                },
                    error => {
                    this.handleError(error);
                });
    }

    public reSendSms = ($event) => {
        this.loginSmsRequired = true; // todo odstranit po implemtaci sluzeb/mocku
        $event.preventDefault();
        console.log('resendsms');
    }

    public handleError = (error) => {
        const message = parseRestAPIErrors(error);
        this.globalError = [];
        this.formLoading = false;
        this.globalError.push(message);
        this.cd.markForCheck();
    }

}
