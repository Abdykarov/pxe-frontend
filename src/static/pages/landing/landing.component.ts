import { Component } from '@angular/core';

import { configCoverage } from 'src/static/config/map-coverage.config';
import { configSupplier } from 'src/static/config/suppliers.config';
import { createRegistrationFormFields } from 'src/common/containers/form/forms/registration/registration-form.config';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    IFieldError,
    SignUpType,
} from 'src/common/containers/form/models/form-definition.model';
import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
})
export class LandingComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public configCoverage: IMapCoverageConfig = configCoverage;
    public configSupplier: ISupplier[] = configSupplier;
    public formLoading = false;
    public formFields = createRegistrationFormFields(SignUpType.NewsSubscription);
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};

    constructor() {
        this.breadcrumbItemsSimple = [
            {
              label: 'Landing page',
              url: null,
            },
        ];
    }

    public submitSubscriptionForm = (values) => {
        this.formLoading = true;
        alert('Formulář odeslán');
    }
}
