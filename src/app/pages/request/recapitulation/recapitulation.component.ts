import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import {
    getConfigStepper,
    parseGraphQLErrors,
} from 'src/common/utils';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import {
    ISupplyPoint,
    ProgressStatus,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { NavigateService } from 'src/app/services/navigate.service';
import { PersonalDataService } from 'src/common/graphql/services/personal-data.service';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-recapitulation',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.PERSONAL_DATA;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.OFFER_STEP;
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);

    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public isIndividual = true;
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private cd: ChangeDetectorRef,
        private navigateService: NavigateService,
        private personalDataService: PersonalDataService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit () {
        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.getSupplyPoint),
            )
            .subscribe(
                (supplyPoint: ISupplyPoint) => {
                    this.navigateService.checkCorrectStep(supplyPoint, ProgressStatus.PERSONAL_DATA);
                    this.supplyPoint = supplyPoint;
                    this.isIndividual = this.supplyPoint.subject.code === SubjectType.SUBJECT_TYPE_INDIVIDUAL;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
        );
    }

    public submitPersonalInfoForm = (personalInfoInput: IPersonalDataInput) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};

        const personalDataAction  = this.navigateService.isPreviousStep(this.supplyPoint, this.ACTUAL_PROGRESS_STATUS)
            ? this.personalDataService.updatePersonalData(this.supplyPoint, personalInfoInput)
            : this.personalDataService.savePersonalData(this.supplyPoint, personalInfoInput);

        personalDataAction
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.savePersonalData),
            )
            .subscribe(
                () => {
                    this.router.navigate(
                        [ROUTES.ROUTER_REQUEST_CONTRACT], {
                        queryParams: {
                            supplyPointId: this.supplyPointId,
                        },
                    });
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
