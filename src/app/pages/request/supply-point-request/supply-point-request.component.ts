import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { Apollo } from 'apollo-angular';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils/';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

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

    public stepperProgressConfigSimple1: IStepperProgressItem[] = [
        {
            url: ROUTES.ROUTER_SECURED_REQUEST_SUPPLY_POINT,
            done: false,
            label: 'Výběr odběrného místa',
        },
        {
            url: ROUTES.ROUTER_SECURED_REQUEST_OFFER_SELECTION,
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: ROUTES.ROUTER_SECURED_DASHBOARD,
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public submitLoginForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.supplyService.saveElectricitySupplyPoint(values)
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    this.router.navigate([ROUTES.ROUTER_SECURED_REQUEST_OFFER_SELECTION]);
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
