import {
    Component,
    ChangeDetectorRef,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';
import {
    ActivatedRoute,
    Router,
} from '@angular/router';

import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { ILogoutRequired } from 'src/app/services/model/logout-required.model';
import { IsLoggedPipe } from 'src/common/pipes/is-logged/is-logged.pipe';
import { ISignUp } from 'src/common/cms/models/sign-up';
import { parseGraphQLErrors } from 'src/common/utils';
import { RegistrationService } from 'src/common/graphql/services/registration.service';

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

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private cookieService: CookieService,
        private isLoggedPipe: IsLoggedPipe,
        private metaService: Meta,
        private registrationService: RegistrationService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) {
        super();
        this.titleService.setTitle(this.signUp.seo.title);
        this.metaService.updateTag({
            name: 'description',
            content: this.signUp.seo.description,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: this.signUp.seo.keywords,
        });

        this.formFields = createRegistrationFormFields(SignUpType.SignUp);
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.authService.setActualStateFromOtherTab();
        const isLogged = this.isLoggedPipe.transform(this.authService.currentUserValue);
        if (isLogged) {
            this.authService.homeRedirect(false, ILogoutRequired.REGISTRATION);
        } else {
            this.registrationService.makeRegistration(values)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    () => {
                        this.formLoading = false;
                        this.formSent = true;
                        this.cd.markForCheck();
                        this.router.navigate([CONSTS.PATHS.LOGIN],
                            {
                                queryParams: {
                                    email: values.email,
                                },
                                state: {
                                    passwordWasSent: true,
                                },
                            },
                        );
                    },
                    (error) => {
                        this.formLoading = false;
                        const { fieldError, globalError } = parseGraphQLErrors(error);
                        this.fieldError = fieldError;
                        this.globalError = globalError;
                        this.cd.markForCheck();
                    });
        }
    }
}
