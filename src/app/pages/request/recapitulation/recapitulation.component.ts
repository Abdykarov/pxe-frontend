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
import { configStepper } from 'src/app/pages/request/recapitulation/recapitulation.config';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import {
    ISupplyPoint,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { PersonalDataService } from 'src/common/graphql/services/personal-data.service';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

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
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private cd: ChangeDetectorRef,
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

        // todo remove after BE fix
        // onum error fix
        if (personalInfoInput.address1) {
            personalInfoInput.address1.orientationNumber = personalInfoInput.address1.orientationNumber || '0';
        }
        if (personalInfoInput.address2) {
            personalInfoInput.address2.orientationNumber = personalInfoInput.address2.orientationNumber || '0';
        }

        this.personalDataService.savePersonalData(this.supplyPoint, personalInfoInput)
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
