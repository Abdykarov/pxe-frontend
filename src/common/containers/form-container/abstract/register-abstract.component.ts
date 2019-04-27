import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import {
    IFieldError,
    IForm,
    SignUpType,
} from 'src/common/containers/form-container/models/form-definition.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { registrationFormFieldsFnc } from '../registration.config';

export class RegisterAbstractComponent {
    public submitRegistrationLoading = false;
    public registrationFormSent = false;
    public registrationGlobalError: string[] = [];
    public registrationFieldError: IFieldError = {};
    public registrationFormFields: IForm;

    protected constructor(
        public apollo: Apollo,
        public cd: ChangeDetectorRef,
        public router: Router,
        public signUpType: SignUpType,
    ) {
        this.registrationFormFields = registrationFormFieldsFnc(signUpType);
    }

    public openConsent(evt) {
        evt.preventDefault();
        window.open('securing-your-data');
    }

    public submitRegistrationForm(values, isFromSignUp: boolean = false) {
        this.submitRegistrationLoading = true;
        this.registrationGlobalError = [];
        this.registrationFieldError = {};
        this.apollo
            .mutate({
                mutation: mutations.makeRegistration,
                variables: values,
            })
            .subscribe(
                () => {
                    this.submitRegistrationLoading = false;
                    this.registrationFormSent = true;
                    this.cd.markForCheck();
                    if (isFromSignUp) {
                        this.router.navigate(['login'],
                            {
                                queryParams:
                                    {
                                        email: values.email,
                                    },
                                state:
                                    {
                                        isFromSignUp: true,
                                    },
                            },
                        );
                    }
                },
                (error) => {
                    this.submitRegistrationLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.registrationFieldError = fieldError;
                    this.registrationGlobalError = globalError;
                    this.cd.markForCheck();
                });
    }
}
