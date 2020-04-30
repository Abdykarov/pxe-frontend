import {
    Component,
    ChangeDetectorRef,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
    SEO,
} from 'src/app/app.constants';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { IsLoggedPipe } from 'src/common/pipes/is-logged/is-logged.pipe';
import { parseGraphQLErrors } from 'src/common/utils';
import { RegistrationService } from 'src/common/graphql/services/registration.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent extends AbstractComponent {
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
        private router: Router,
        private titleService: Title,
    ) {
        super();
        this.titleService.setTitle(CONSTS.TITLES.SIGN_UP);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.SIGN_UP,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.SIGN_UP,
            ].toString(),
        });

        this.formFields = createRegistrationFormFields(SignUpType.SignUp);
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.registrationService.makeRegistration(values)
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
