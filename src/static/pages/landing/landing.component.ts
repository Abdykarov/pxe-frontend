import { Component } from '@angular/core';

import { configCoverage } from 'src/static/config/map-coverage.config';
import { configSupplier } from 'src/static/config/suppliers.config';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IFieldError } from 'src/common/containers/form-container/models/form-definition.model';
import { IMapCoverageConfig } from 'src/common/ui/map-coverage/model/coverage.model';
import { ISupplier } from 'src/common/ui/supplier/model/supplier.model';
import { registrationFormFields } from 'src/common/containers/form-container/registration.config';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing.component.html',
})
export class LandingComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public submitSubscriptionLoading = false;
    public subscriptionFormFields = registrationFormFields;
    public subscriptionFormSent = false;
    public subscriptionGlobalError: string[] = [];
    public subscriptionFieldError: IFieldError = {};

    public configSupplier: ISupplier[] = configSupplier;
    public configCoverage: IMapCoverageConfig = configCoverage;

    public submitSubscriptionForm = (values) => {
        this.submitSubscriptionLoading = true;
        console.log('Formulář odeslán');
    }

    public openConsent(evt) {
        evt.preventDefault();
        console.log('Clicked');
    }

    constructor() {
        this.breadcrumbItemsSimple = [
            {
              label: 'Landing page',
              url: null,
            },
        ];
    }
}
