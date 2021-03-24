import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { CreateUserFacade } from 'src/app/pages/admins/create-user/create-user.facade';
import { formFields} from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { IFieldError} from 'src/common/containers/form/models/form-definition.model';
import { ISupplyPointImportInput} from 'src/common/graphql/models/supply-point-import.model';
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
export class SupplyPointComponent extends AbstractComponent {
    public readonly activeSupplyPoint$ = this.createUserFacade.activeSupplyPoint$;
    public readonly queryParams$ = this.createUserFacade.queryParams$;
    public readonly supplyPointsImport$ = this.createUserFacade.supplyPointsImport$;

    public editMode = SUPPLY_POINT_EDIT_TYPE.NORMAL;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public supplyPointImport: any = null;
    public isIndividual = false;

    constructor(
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private createUserFacade: CreateUserFacade,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        super();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.formFields.controls = removeRequiredValidators(this.formFields.controls);
    }

    public save = (supplyPointFormData, askForOfferId, activeSupplyPoint: ISupplyPoint) => {
        const supplyPoint: ISupplyPointImportInput = R.pick([
            'id',
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
        if (activeSupplyPoint?.contract?.personalData) {
            supplyPoint.personalData =
                this.supplyPointImportService.mapPersonalInfoToPersonalInfoInput(activeSupplyPoint.contract.personalData);
        }

        this.supplyPointImportService.mapPricesToSupplyPointImport(supplyPoint, activeSupplyPoint);

        this.supplyPointImportService.createSupplyPointImport(askForOfferId, supplyPoint, !activeSupplyPoint)
            .pipe(
                takeUntil(this.destroy$),
                map(
                    ({data}) => data.createSupplyPointImport,
                ),
            )
            .subscribe(
                (newSupplyPoint: ISupplyPoint) => {
                    this.supplyPointImportService.setActiveSupplyPoint(newSupplyPoint).subscribe();
                    this.formLoading = false;
                    this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_RECAPITULATION], {
                        queryParams: {
                            askForOfferId: this.createUserFacade.queryParamsSubject$.getValue().askForOfferId,
                            supplyPointId: newSupplyPoint.id,
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
