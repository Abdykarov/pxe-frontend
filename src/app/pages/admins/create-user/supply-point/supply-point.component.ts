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
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AskForOfferService} from 'src/common/graphql/services/ask-for-offer.service';
import {
    CommodityType,
    ISupplyPoint, SubjectType,
} from 'src/common/graphql/models/supply.model';
import { formFields} from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError} from 'src/common/containers/form/models/form-definition.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';
import {
    parseGraphQLErrors,
    removeRequiredValidators,
} from 'src/common/utils';
import { SUPPLY_POINT_EDIT_TYPE} from 'src/app/app.constants';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';

@Component({
    selector: 'pxe-create-user-supply-point',
    templateUrl: './supply-point.component.html',
    styleUrls: ['./supply-point.component.scss'],
})
export class SupplyPointComponent extends AbstractComponent implements OnInit {
    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public supplyPointImport: any = null;
    public supplyPoint = null;
    public isIndividual = false;
    public askForOfferId = null;

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        super();
        this.askForOfferId = route.snapshot.queryParams.askForOfferId;
        this.formFields.controls = removeRequiredValidators(this.formFields.controls);
    }

    ngOnInit() {
        super.ngOnInit();
        this.supplyPointImportService.
            findSupplyPointImport(this.askForOfferId)
                .pipe(
                    takeUntil(this.destroy$),
                    map(({data}) => data.findSupplyPointImport),
                )
                .subscribe((supplyPoint: ISupplyPoint) => {
                    if (supplyPoint === null) {
                        this.supplyPoint = {};
                    } else {
                        this.supplyPoint = supplyPoint;
                    }
                    this.cd.markForCheck();
                });

    }

    public save = (supplyPointFormData) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};

        const supplyPoint: ISupplyPointImportInput = R.pick([
            'supplierId',
            'name',
            'address',
            'expirationDate',
            'subjectTypeId',
            'contractEndTypeId',
            'timeToContractEnd',
            'timeToContractEndPeriodId',
        ], supplyPointFormData);

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            supplyPoint.supplyPointPowerAttributes = R.pick([
                'ean',
                'circuitBreakerId',
                'phasesId',
                'distributionRateId',
                'annualConsumptionNT',
                'annualConsumptionNTUnit',
                'annualConsumptionVT',
                'annualConsumptionVTUnit',
            ], supplyPointFormData);
        } else {
            supplyPoint.supplyPointGasAttributes = R.pick([
                'eic',
                'annualConsumption',
                'annualConsumptionUnit',
            ], supplyPointFormData);
        }

        this.supplyPointImportService.createSupplyPointImport(this.askForOfferId, supplyPoint)
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ({data}) => data.createSupplyPointImport,
                ),
            )
            .subscribe(
                (supplyPointId) => {
                    this.formLoading = false;
                    this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_RECAPITULATION], {
                        queryParams: {
                            askForOfferId: this.askForOfferId,
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
