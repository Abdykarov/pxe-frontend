import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { getConfigStepper } from 'src/common/utils/get-progress-stepper-config.fnc';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { supplyPointConfigPower } from 'src/static/organisms/supply-point/config';

@Component({
    selector: 'pxe-supply-point-selection',
    templateUrl: './supply-point-selection.component.html',
    styleUrls: ['./supply-point-selection.component.scss'],
})
export class SupplyPointSelectionComponent extends AbstractComponent implements OnInit {
    public globalError: string[] = [];
    public stepperProgressConfig: IStepperProgressItem[] = getConfigStepper(ProgressStatus.SUPPLY_POINT);
    public supplyPoints: ISupplyPoint[] = null;
    public supplyPointPower = supplyPointConfigPower;

    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus(null,
            [
                ContractStatus.NOT_CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map( ({data}) =>  data.findSupplyPointsByContractStatus),
            )
            .subscribe(
                (supplyPoints: ISupplyPoint[]) => {
                    this.supplyPoints = supplyPoints;
                    this.cd.markForCheck();
                },
                error => {
                    this.supplyPoints = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }


    public submitSupplyForm = (supplyPointData: ISupplyPoint) => {
        this.globalError = [];
        let saveSupplyPoint;

        const supplyPoint: ISupplyPoint = R.pick([
            'supplierId',
            'name',
            'address',
            'expirationDate',
            'subjectTypeId',
            'contractEndTypeId',
            'timeToContractEnd',
            'timeToContractEndPeriodId',
        ], supplyPointData);

        if (supplyPoint.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'ean',
                    'circuitBreakerId',
                    'phasesId',
                    'distributionRateId',
                    'annualConsumptionNT',
                    'annualConsumptionVT',
                ], supplyPointData);
            saveSupplyPoint = this.supplyService.createPowerSupplyPoint(supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'eic',
                    'annualConsumption',
                ], supplyPointData);
            saveSupplyPoint = this.supplyService.createGasSupplyPoint(supplyPoint, gasAttributes);
        }

        saveSupplyPoint
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.createPowerSupplyPoint || data.createGasSupplyPoint),
            )
            .subscribe(
                (supplyPointId) => {
                    this.cd.markForCheck();
                    this.router.navigate(
                        [ROUTES.ROUTER_REQUEST_OFFER_SELECTION],
                        {
                            queryParams: {
                                supplyPointId,
                            },
                        });
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }


}
