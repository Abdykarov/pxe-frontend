import {
    ActivatedRoute,
    NavigationExtras,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    formFieldsLogin,
    LOGIN_STATE,
} from './config';
import { ILoginResponse } from 'src/app/services/model/auth.model';
import {
    IChangePassword,
    IConfirmationCode,
    ILoginState,
} from './login.model';
import {
    IUserLogin,
    LANDING_PAGE,
    PASSWORD_DESTINATION,
} from 'src/common/graphql/models/user.model';
import {
    parseGraphQLErrors,
    parseRestAPIErrors,
} from 'src/common/utils/';
import { ROUTES } from 'src/app/app.constants';
import { UserService } from 'src/common/graphql/services/user.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent {
    public email = '';
    public formFieldsLogin = formFieldsLogin;
    public formLoading = false;
    public globalError: string[] = [];
    public LOGIN_STATE = LOGIN_STATE;
    public passwordWasSent = false;
    public password: string;
    public state = ILoginState.LOGIN;
    public wasSentToPhone = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
    ) {
        super();

        this.route.queryParams
            .pipe(
                takeUntil(
                    this.destroy$,
                ),
            )
            .subscribe(() => {
                this.state = ILoginState.LOGIN;
            });
    }

    public submitChangePassword = (changePassword: IChangePassword) => {
        this.formLoading = true;

        this.userService.changePassword(this.password, changePassword.password)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.changePassword),
            )
            .subscribe(
                (loginResponse: ILoginResponse) => {
                    this.authService.manageLoginResponse(loginResponse);
                    this.navigateAfterLogin(loginResponse, true);
                },
                error => {
                    this.resetErrorsAndLoading();
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public submitResetPassword = ({email}) => {
        this.email = email;
        this.resetPassword(email);
    }

    public resetPassword = (email: string) => {
        this.formLoading = true;
        this.userService.resetPassword(email)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.resetPassword),
            )
            .subscribe(
                (passwordDestination: PASSWORD_DESTINATION) => {
                    this.wasSentToPhone = passwordDestination === PASSWORD_DESTINATION.PHONE;
                    this.passwordWasSent = true;
                    this.state = ILoginState.LOGIN_AFTER_RESET;
                    this.resetErrorsAndLoading();
                    this.cd.markForCheck();
                },
                error => {
                    this.resetErrorsAndLoading();
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public submitFormLogin = (userLogin: IUserLogin) => {
        this.password = userLogin.password;
        this.formLoading = true;
        this.authService.login(userLogin)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (loginResponse: ILoginResponse) => {
                    if (this.authService.passwordChangeRequired()) {
                        this.state = ILoginState.CHANGE_PASSWORD;
                        this.resetErrorsAndLoading();
                        this.cd.markForCheck();
                        return;
                    }
                    if (this.authService.needSmsConfirm()) {
                        this.state = ILoginState.SEND_SMS;
                        this.resetErrorsAndLoading();
                        this.cd.markForCheck();
                        return;
                    }
                    this.navigateAfterLogin(loginResponse);
                },
                error => {
                    this.resetErrorsAndLoading();
                    this.handleError(error);
                });
    }

    public submitSupplierLoginSms = (confirmationCode: IConfirmationCode) => {
        this.formLoading = true;
        this.authService.confirmSupplierLoginSms(confirmationCode)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (loginResponse: ILoginResponse) => {
                    this.authService.manageLoginResponse(loginResponse);
                    this.navigateAfterLogin(loginResponse);
                },
                error => {
                    this.resetErrorsAndLoading();
                    this.handleError(error);
                });
    }

    public forgottenPasswordAction = ($event) => {
        $event.preventDefault();
        this.resetErrorsAndLoading();
        if (this.authService.isLogged()) {
            this.authService.logout()
                .pipe(
                    takeUntil(this.destroy$),
                ).subscribe(
                () => {
                        this.state = ILoginState.RESET;
                        this.cd.markForCheck();
                    },
                () => {
                        this.state = ILoginState.RESET;
                        this.cd.markForCheck();
                    },
                );
        } else {
            this.state = ILoginState.RESET;
        }
    }

    public sendSupplierLoginSms() {
        this.formLoading = true;
        this.authService.sendSupplierLoginSms()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                res => {
                    this.resetErrorsAndLoading();
                    this.cd.markForCheck();
                },
                error => {
                    this.resetErrorsAndLoading();
                    this.handleError(error);
                });
    }

    public resendSupplierLoginSms = ($event) => {
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

    public routerAfterLogin = ({landingPage}) => {
        switch (landingPage) {
            case LANDING_PAGE.DASHBOARD:
                return ROUTES.ROUTER_DASHBOARD;
            case LANDING_PAGE.NEW_SUPPLY_POINT:
                return ROUTES.ROUTER_REQUEST_SUPPLY_POINT;
            case LANDING_PAGE.OFFERS:
                return ROUTES.ROUTER_SUPPLY_OFFER_POWER;
            case LANDING_PAGE.WAITING_FOR_PAYMENT:
                return ROUTES.ROUTER_REQUEST_PAYMENT;
        }
    }

    public navigateAfterLogin = (loginResponse: ILoginResponse, changedPassword = false) => {
        const extras: NavigationExtras = {};

        if (changedPassword) {
            extras.state = {
                showBanner: true,
            };
        }
        if (loginResponse.landingPage === LANDING_PAGE.WAITING_FOR_PAYMENT) {
            const supplyPointId = this.authService.currentUserValue.evaluatedSupplyPoint;
            if (supplyPointId) {
                extras.queryParams = {
                    supplyPointId,
                };
            }
        }
        this.router.navigate([this.routerAfterLogin(loginResponse)], extras);
    }
}
