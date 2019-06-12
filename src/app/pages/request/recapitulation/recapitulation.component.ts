import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from 'src/app/pages/request/recapitulation/recapitulation.config';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { PersonalDataService } from 'src/common/graphql/services/personal-data.service';
import { ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'pxe-recapitulation',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;

    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public isIndividual = true;
    public contractId: number;

    constructor(
        private cd: ChangeDetectorRef,
        private personalDataService: PersonalDataService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    ngOnInit () {
        this.contractId = parseInt(this.route.snapshot.paramMap.get('contractId'), 10);
    }

    public submitPersonalInfoForm = (personalInfoInput: IPersonalDataInput) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};

        this.personalDataService.savePersonalData(this.contractId, personalInfoInput)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.router.navigate([ROUTES.ROUTER_REQUEST_CONTRACT]);
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
