import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as mutations from 'src/common/graphql/mutations';
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { parseGraphQLErrors } from 'src/common/utils/';

@Component({
    templateUrl: './supply-point-request.component.html',
    styleUrls: ['./supply-point-request.component.scss'],
})
export class SupplyPointRequestComponent extends AbstractComponent {
    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
    ) {
        super();
    }

    public submitLoginForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.apollo
            .mutate({
                mutation: mutations.saveElectricitySupplyPoint,
                variables: values,
            })
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    // TODO redirect to next step
                    console.log('%c ***** SAVED *****', 'background: #bada55; color: #000; font-weight: bold', data);
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
