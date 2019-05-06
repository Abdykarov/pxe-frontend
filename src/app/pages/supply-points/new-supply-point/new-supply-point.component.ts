import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { parseGraphQLErrors } from 'src/common/utils/';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    templateUrl: './new-supply-point.component.html',
    styleUrls: ['./new-supply-point.component.scss'],
})
export class NewSupplyPointComponent extends AbstractComponent {
    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public stepperProgressConfig: IStepperProgressItem[] = [
        {
            url: '/secured/supply-points/new-supply-point',
            done: false,
            label: 'Výběr odběrného místa',
        },
        {
            url: '/secured/request/offer-selection',
            done: false,
            label: 'Výběr nabídky',
        },
        {
            url: '/secured/dashboard',
            done: false,
            label: 'Podepsání smlouvy',
        },
    ];

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        this.supplyService.saveElectricitySupplyPoint(values)
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                    this.router.navigate(['/secured/request/offer-selection']);
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
