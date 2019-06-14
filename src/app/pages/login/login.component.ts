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
    formFieldsLogin,
    ILoginState,
    LOGIN_STATE,
} from './login.model';
import { parseRestAPIErrors } from 'src/common/utils/';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent {
    public formLoading = false;
    public globalError: string[] = [];

    public formFieldsLogin = formFieldsLogin;

    public state = ILoginState.LOGIN;

    public LOGIN_STATE = LOGIN_STATE;

    public contactInfo = '';
    public isSendToTelephone = false;
    public showPasswordSend = false;

    public haveUserDefinitionTelephone = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();
    }

    public submitChangePassword = (values) => {
        this.state = ILoginState.CHANGE_PASSWORD;
    }

    public submitResetPassword = ({contactInfo}) => {
        this.contactInfo = contactInfo;
        this.isSendToTelephone = false; // todo
        this.showPasswordSend = true;
        this.state = ILoginState.LOGIN_AFTER_RESET;
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
                    this.resetErrorsAndLoading();
                    if (this.authService.currentUserValue.supplier) {
                        if (this.authService.currentUserValue.smsConfirmed) {
                            this.router.navigate([ROUTES.ROUTER_DASHBOARD]);
                        }
                        this.state = ILoginState.SEND_SMS;
                        this.resetErrorsAndLoading();
                        this.cd.markForCheck();
                    } else {
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
                    this.resetErrorsAndLoading();
                    this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER_POWER]);
                },
                error => {
                    this.handleError(error);
                });
    }


    public submitResent = (event) => {
        console.log(console.log('EVENT'));
    }

    public forgottenPasswordAction = ($event) => {
        $event.preventDefault();
        this.state = ILoginState.RESET;
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
                    this.resetErrorsAndLoading();
                    this.cd.markForCheck();
                },
                    error => {
                    this.handleError(error);
                });
    }

    public resendSupplierLoginSms = ($event) => {
        this.resetErrorsAndLoading();
        $event.preventDefault();
        this.sendSupplierLoginSms();
    }

    public handleError = (error) => {
        const message = parseRestAPIErrors(error);
        this.resetErrorsAndLoading();
        this.globalError.push(message);
        this.cd.markForCheck();
    }

    public resetErrorsAndLoading = () => {
        this.globalError = [];
        this.formLoading = false;
    }
}
