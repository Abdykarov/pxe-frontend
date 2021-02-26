import {
    ActivatedRoute,
    NavigationExtras,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    OnDestroy,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
    SEO,
} from 'src/app/app.constants';
import { CookiesService } from 'src/app/services/cookies.service';
import {
    formFieldsLogin,
    LOGIN_STATE,
} from './config';
import {
    IChangePassword,
    IConfirmationCode,
    ILoginState,
} from './login.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ILoginResponse } from 'src/app/services/model/auth.model';
import { ILogoutRequired } from 'src/app/services/model/logout-required.model';
import { IsLoggedPipe } from 'src/common/pipes/is-logged/is-logged.pipe';
import {
    IUserLogin,
    LANDING_PAGE,
    PASSWORD_DESTINATION,
} from 'src/common/graphql/models/user.model';
import {
    parseGraphQLErrors,
    parseRestAPIErrors,
} from 'src/common/utils';
import { UserService } from 'src/common/graphql/services/user.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent implements OnDestroy {
    private cleanLogoutReasonBanner = false;
    public login = '';
    public formFieldsLogin = formFieldsLogin;
    public formLoading = false;
    public fieldError: IFieldError = {};
    public globalError: string[] = [];
    public LOGIN_STATE = LOGIN_STATE;
    public passwordWasSent = false;
    public password: string;
    public phoneNumber: string;
    public reasonForLogoutUser = null;
    public state = ILoginState.LOGIN;
    public wasSentToPhone = false;
    public urlToRedirectAfterLogin = null;

    @HostListener('window:beforeunload', ['$event'])
    removeReasonForLogoutUser($event) {
        this.cookieService.remove(CONSTS.STORAGE_HELPERS.REASON_FOR_LOGOUT_USER);
    }

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private cookieService: CookiesService,
        private isLoggedPipe: IsLoggedPipe,
        private metaService: Meta,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private titleService: Title,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();

        if (isPlatformBrowser(this.platformId)) {
            this.reasonForLogoutUser = this.cookieService.get(CONSTS.STORAGE_HELPERS.REASON_FOR_LOGOUT_USER);
            this.urlToRedirectAfterLogin = window.history.state.urlToRedirectAfterLogin;
        }

        this.titleService.setTitle(CONSTS.TITLES.LOGIN);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.LOGIN,
        });
        this.metaService.updateTag({
                name: 'keywords',
                content: [
                    ...SEO.META_KEYWORDS.LANDING_PAGE,
                    ...SEO.META_KEYWORDS.LOGIN,
                ].toString(),
            },
        );

        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                if (this.cleanLogoutReasonBanner) {
                    this.cookieService.remove(CONSTS.STORAGE_HELPERS.REASON_FOR_LOGOUT_USER);
                    this.reasonForLogoutUser = null;
                }
                this.cleanLogoutReasonBanner = true;
                this.state = ILoginState.LOGIN;
                this.resetErrorsAndLoading();
                this.passwordWasSent = false;
            });
    }

    public submitChangePassword = (changePassword: IChangePassword) => {
        this.reasonForLogoutUser = null;
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

    public submitResetPassword = ({login}) => {
        this.reasonForLogoutUser = null;
        this.login = login;
        this.resetPassword(login);
    }

    public resetPassword = (login: string) => {
        this.reasonForLogoutUser = null;
        this.formLoading = true;
        this.authService.cleanUserData();
        this.userService.resetPassword(login)
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
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public submitFormLogin = (userLogin: IUserLogin) => {
        this.reasonForLogoutUser = null;
        this.password = userLogin.password;
        this.formLoading = true;
        this.authService.setActualStateFromOtherTab();
        const isLogged = this.isLoggedPipe.transform(this.authService.currentUserValue);
        const nextUserIsCurrent = userLogin.login === R.path(['currentUserValue', 'userLogin'], this.authService);
        if (isLogged && !nextUserIsCurrent) {
            this.authService.homeRedirect(false, ILogoutRequired.LOGIN);
        } else {
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
                            this.phoneNumber = this.authService.currentUserValue.phoneNumber;
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
    }

    public submitSupplierLoginSms = (confirmationCode: IConfirmationCode) => {
        this.reasonForLogoutUser = null;
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
        this.reasonForLogoutUser = null;
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
        this.reasonForLogoutUser = null;
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
        this.reasonForLogoutUser = null;
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
                return ROUTES.ROUTER_REQUEST_SIGNBOARD;
            case LANDING_PAGE.OFFERS:
                return ROUTES.ROUTER_SUPPLY_OFFER_POWER;
            case LANDING_PAGE.WAITING_FOR_PAYMENT:
                return ROUTES.ROUTER_REQUEST_PAYMENT;
            case LANDING_PAGE.CONTRACT_IMPORT:
                return ROUTES.ROUTER_ASK_FOR_OFFER_NEW;
        }
    }

    public navigateAfterLogin = (loginResponse: ILoginResponse, changedPassword = false) => {
        const extras: NavigationExtras = {
            state: {
                afterLogin: true,
            },
        };

        if (changedPassword) {
            extras.state = {
                showBanner: true,
                ...extras.state,
            };
        }

        if (this.urlToRedirectAfterLogin) {
            this.router.navigateByUrl(this.urlToRedirectAfterLogin, extras);
            return;
        }

        if (loginResponse?.landingPage === LANDING_PAGE.WAITING_FOR_PAYMENT) {
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
