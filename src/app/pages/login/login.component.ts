import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { debounceTime, map, takeUntil } from 'rxjs/operators';

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
    RESET_PASSWORD_RESPONSE_EMAIL,
    RESET_PASSWORD_RESPONSE_POWER,
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

    public haveUserDefinitionTelephone = false;

    public password: string;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private passwordService: PasswordService,
        private router: Router,
    ) {
        super();
    }

    public submitChangePassword = (data: IChangePassword) => {
        this.passwordService.changePassword(this.password, data.password)
            .pipe(
                takeUntil(this.destroy$),
            ).subscribe();
    }

    public submitResetPassword = ({email}) => {
        this.passwordService.resetPassword(email)
            .subscribe(
            (res: 'EMAIL' | 'PASSWORD') => {
                    this.email = email;
                    this.wasSentToPhone = res === RESET_PASSWORD_RESPONSE_EMAIL;
                    this.passwordWasSent = true;
                    this.state = ILoginState.LOGIN_AFTER_RESET;
                }, (error) => {
                    this.handleError(error);
            });
    }

    public submitFormLogin = (values) => {
        this.password = values.password;
        this.formLoading = true;
        this.authService
            .login(values)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (resp) => {
                    this.resetErrorsAndLoading();

                    console.log(this.authService.currentUserValue);

                    if (this.authService.currentUserValue.passwordReset) {
                        this.state = ILoginState.CHANGE_PASSWORD;
                        return;
                    }

                    if (this.authService.currentUserValue.supplier) {
                        if (this.authService.currentUserValue.smsConfirmed) {
                            this.router.navigate([ROUTES.ROUTER_SUPPLY_OFFER_POWER], {
                                queryParams:
                                    {
                                        showBanner: true,
                                    },
                            });
                        }
                        this.state = ILoginState.SEND_SMS;
                        this.resetErrorsAndLoading();
                        this.cd.markForCheck();
                    } else {
                        // todo have supply point
                        this.router.navigate([ROUTES.ROUTER_DASHBOARD], {
                            queryParams:
                                {
                                    showBanner: true,
                                },
                        });


                         // this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT], {
                         //     queryParams:
                         //         {
                         //             showBanner: true,
                         //         },
                         // });
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
