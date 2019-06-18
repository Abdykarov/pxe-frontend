import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import {
    formFieldsLogin,
    IChangePassword,
    ILoginState,
    LOGIN_STATE,
} from './login.model';
import { PasswordService } from 'src/common/graphql/services/password.service';
import { parseRestAPIErrors } from 'src/common/utils/';
import {
    ILoginResponse, IUserLogin,
    LANDING_PAGE_DASHBOARD,
    RESET_PASSWORD_RESPONSE_EMAIL,
    RESET_PASSWORD_RESPONSE_PHONE,
} from 'src/common/graphql/models/password';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent  {
    public formLoading = false;
    public globalError: string[] = [];

    public formFieldsLogin = formFieldsLogin;

    public state = ILoginState.LOGIN;

    public LOGIN_STATE = LOGIN_STATE;

    public email = '';
    public wasSentToPhone = false;
    public passwordWasSent = false;

    public password: string;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private passwordService: PasswordService,
        private router: Router,
    ) {
        super();
    }

    public submitChangePassword = (changePassword: IChangePassword) => {
        this.passwordService.changePassword(this.password, changePassword.password)
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe(
            (loginResponse: ILoginResponse) => {
                this.authService.setToken(loginResponse.token);
                this.router.navigate([this.routerAfterLogin(loginResponse)], {
                    state:
                    {
                        showBanner: true,
                    },
                });
                return;
            });
    }

    public submitResetPassword = ({email}) => {
        this.passwordService.resetPassword(email)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.resetPassword),
            )
            .subscribe(
            (passwordDestination: 'EMAIL' | 'PHONE') => {
                    this.email = email;
                    this.wasSentToPhone = passwordDestination === RESET_PASSWORD_RESPONSE_PHONE;
                    this.passwordWasSent = true;
                    this.state = ILoginState.LOGIN_AFTER_RESET;
                    this.resetErrorsAndLoading();
                    this.cd.markForCheck();
                }, (error) => {
                    this.handleError(error);
            });
    }

    public submitFormLogin = (userLogin: IUserLogin) => {
        this.password = userLogin.password;
        this.formLoading = true;
        this.authService
            .login(userLogin)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (loginResponse: ILoginResponse) => {
                    if (this.authService.userNeedChangePassword()) {
                        this.state = ILoginState.CHANGE_PASSWORD;
                        this.resetErrorsAndLoading();
                        this.cd.markForCheck();
                        return;
                    }

                    if (this.authService.isSupplier()) {
                        if (this.authService.currentUserValue.smsConfirmed) {
                            this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER_POWER]);
                        }
                        this.state = ILoginState.SEND_SMS;
                        this.resetErrorsAndLoading();
                        this.cd.markForCheck();
                    } else {
                        this.router.navigate([this.routerAfterLogin(loginResponse)]);
                    }
                },
                error => {
                    this.handleError(error);
                    this.resetErrorsAndLoading();
                });
    }

    public submitSupplierLoginSms = (values) => {
        console.log(values);
        this.formLoading = true;
        this.authService
            .confirmSupplierLoginSms(values)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (loginResponse: ILoginResponse) => {
                    this.authService.setToken(loginResponse.token);
                    this.resetErrorsAndLoading();
                    this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER_POWER]);
                },
                error => {
                    this.handleError(error);
                });
    }


    public submitResent = () => {
        this.resetErrorsAndLoading();

        this.passwordService.resetPassword(this.email)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }

    public forgottenPasswordAction = ($event) => {
        this.resetErrorsAndLoading();
        $event.preventDefault();
        if (this.authService.isLogged()) {
            this.authService
                .logout()
                .pipe(
                    takeUntil(this.destroy$),
                ).subscribe((res) => {
                    this.state = ILoginState.RESET;
                    this.cd.markForCheck();
                });
        }
        this.state = ILoginState.RESET;
    }

    public sendSupplierLoginSms() {
        this.resetErrorsAndLoading();
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

    public routerAfterLogin = (loginResponse: ILoginResponse) => {
        if (this.authService.currentUserValue.supplier) {
            return ROUTES.ROUTER_SUPPLY_OFFER_POWER;
        } else {
            if (loginResponse.landingPage === LANDING_PAGE_DASHBOARD) {
                return ROUTES.ROUTER_DASHBOARD;
            } else {
                return ROUTES.ROUTER_REQUEST_SUPPLY_POINT;
            }
        }
    }
}
