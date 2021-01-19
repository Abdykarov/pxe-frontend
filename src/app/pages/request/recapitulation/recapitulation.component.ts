import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import {
    combineLatest,
    Observable,
} from 'rxjs';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CODE_LIST_TYPES,
    GTM_CONSTS,
    ROUTES,
    S_ANALYTICS,
} from 'src/app/app.constants';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import {
    getConfigStepper,
    parseGraphQLErrors,
    removeAccent,
    transformCodeList,
} from 'src/common/utils';
import { GTMService } from 'src/app/services/gtm.service';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import {
    ICodelistOptions,
    ISupplyPoint,
    ProgressStatus,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { PersonalDataService } from 'src/common/graphql/services/personal-data.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-recapitulation',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent extends AbstractComponent implements OnInit {
    public readonly ACTUAL_PROGRESS_STATUS = ProgressStatus.PERSONAL_DATA;
    public readonly PREVIOUS_PROGRESS_STATUS = ProgressStatus.OFFER_STEP;

    public codeLists: ICodelistOptions;
    public formFields = formFields;
    public formSent = false;
    public isIndividual = true;
    public fieldError: IFieldError = {};
    public formLoading = false;
    public globalError: string[] = [];
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(this.ACTUAL_PROGRESS_STATUS);
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    public codeLists$: Observable<ICodelistOptions> = this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            takeUntil(this.destroy$),
            map(({data}) => transformCodeList(data.findCodelistsByTypes)),
        );

    public supplyPoint$: Observable<ISupplyPoint> = this.supplyService.getSupplyPoint(this.supplyPointId)
        .pipe(
            takeUntil(this.destroy$),
            map(({data}) => data.getSupplyPoint),
        );

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private gtmService: GTMService,
        public navigateRequestService: NavigateRequestService,
        private personalDataService: PersonalDataService,
        private route: ActivatedRoute,
        private router: Router,
        private sAnalyticsService: SAnalyticsService,
        private supplyService: SupplyService,
    ) {
        super();
        this.gtmService.loadFormEvent(GTM_CONSTS.LABELS.STEP_FOUR, this.authService.hashedUserId);
    }

    ngOnInit () {
        combineLatest([this.codeLists$, this.supplyPoint$])
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([codeLists, supplyPoint]) => {
                    if (!R.isNil(codeLists) && !R.isNil(supplyPoint)) {
                        this.navigateRequestService.checkCorrectStep(supplyPoint, ProgressStatus.PERSONAL_DATA);
                        this.supplyPoint = supplyPoint;
                        this.isIndividual = this.supplyPoint.subject.code === SubjectType.SUBJECT_TYPE_INDIVIDUAL;
                        this.codeLists = codeLists;
                        this.gtmService.pushEvent({
                            event: GTM_CONSTS.EVENTS.CHECKOUT,
                            ecommerce: {
                                checkout: {
                                    actionField: {
                                        step: 4,
                                    },
                                    products: [{
                                        name: removeAccent(this.supplyPoint?.supplier?.name).toLowerCase(),
                                        id: this.supplyPoint?.contract?.offer?.name,
                                        brand: GTM_CONSTS.BRAND,
                                        quantity: 1,
                                    }],
                                },
                            },
                        });
                        this.cd.markForCheck();
                    }
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

        const personalDataAction  = this.navigateRequestService.isPreviousStep(this.supplyPoint, this.ACTUAL_PROGRESS_STATUS) ?
            this.personalDataService.updatePersonalData(this.supplyPoint, personalInfoInput) :
            this.personalDataService.savePersonalData(this.supplyPoint, personalInfoInput);

        personalDataAction
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.savePersonalData),
            )
            .subscribe(
                () => {
                    this.sAnalyticsService.sFormSubmit(personalInfoInput);
                    this.sAnalyticsService.sendWebData(
                        {},
                        {
                            email: this.authService.currentUserValue.email,
                        },
                        {},
                        {
                            ACTION: S_ANALYTICS.ACTIONS.RECAPITULATION,
                            personalDataAction,
                            supplyPoint: this.supplyPoint,
                        },
                    );
                    this.gtmService.pushEvent({
                        'event': GTM_CONSTS.EVENTS.EVENT_TRACKING,
                        'category': GTM_CONSTS.CATEGORIES.FORM,
                        'dodavatel': removeAccent(this.supplyPoint?.supplier?.name).toLowerCase(),
                        'action': GTM_CONSTS.ACTIONS.CONTINUE,
                        'label': GTM_CONSTS.LABELS.STEP_FOUR,
                        'userID': this.authService.hashedUserId,
                    });
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
                },
            );
    }

    public chooseNewOfferAction = (evt) => {
        evt.preventDefault();
        this.navigateRequestService.routerToRequestStep(this.supplyPoint, ProgressStatus.OFFER_STEP);
    }
}
