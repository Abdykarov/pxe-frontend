import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie';
import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';
import { CONSTS, GTM_CONSTS, ROUTES } from 'src/app/app.constants';
import { AbstractComponent } from 'src/common/abstract.component';
import { ISeo } from 'src/common/cms/models/seo';
import { ISignUp } from 'src/common/cms/models/sign-up';
import { AskForOfferContainerComponent } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.component';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { IsLoggedPipe } from 'src/common/pipes/common/is-logged/is-logged.pipe';
import { AuthService } from 'src/common/services/auth.service';
import { CryptoService } from 'src/common/services/crypto.service';
import { GTMService } from 'src/common/services/gtm.service';
import { ILogoutRequired } from 'src/common/services/model/logout-required.model';
import { parseGraphQLErrors } from 'src/common/utils';

@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends AbstractComponent {
    public readonly signUp: ISignUp = this.route.snapshot.data.signUp;

    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formFields: IForm;
    public routes = ROUTES;

    @ViewChild('fileContainer', { static: true })
    public fileContainer: AskForOfferContainerComponent;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private cookieService: CookieService,
        private cryptoService: CryptoService,
        private gtmService: GTMService,
        private isLoggedPipe: IsLoggedPipe,
        private metaService: Meta,
        private registrationService: RegistrationService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) {
        super();
        const seo: ISeo = R.head(this.signUp.seo);

        this.titleService.setTitle(seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: seo.keywords,
        });

        this.formFields = createRegistrationFormFields(SignUpType.SignUp);
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.authService.setActualStateFromOtherTab();
        const isLogged = this.isLoggedPipe.transform(
            this.authService.currentUserValue
        );
        if (isLogged) {
            this.authService.homeRedirect(false, ILogoutRequired.REGISTRATION);
        } else {
            this.registrationService
                .makeRegistration(values)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    () => {
                        this.gtmService.pushEvent({
                            event: GTM_CONSTS.EVENTS.EVENT_TRACKING,
                            category: GTM_CONSTS.CATEGORIES.REGISTRATION,
                            action: GTM_CONSTS.ACTIONS.SENT,
                            label: GTM_CONSTS.LABELS.REGISTRATION,
                            email: this.cryptoService.hashUserId(values.email),
                        });
                        this.formLoading = false;
                        this.formSent = true;
                        this.cd.markForCheck();
                        this.router.navigate([CONSTS.PATHS.LOGIN], {
                            queryParams: {
                                email: values.email,
                            },
                            state: {
                                passwordWasSent: true,
                            },
                        });
                    },
                    (error) => {
                        this.formLoading = false;
                        const { fieldError, globalError } =
                            parseGraphQLErrors(error);
                        this.fieldError = fieldError;
                        this.globalError = globalError;
                        this.cd.markForCheck();
                    }
                );
        }
    };

    public routerToLogin = (event) => {
        event.preventDefault();
        this.router.navigate([ROUTES.ROUTER_LOGIN]);
    };
}
