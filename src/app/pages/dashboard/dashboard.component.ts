import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    CommodityType,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { map, takeUntil } from 'rxjs/operators';
import { parseGraphQLErrors } from 'src/common/utils';
import { OverviewState, OverviewStateWrapper } from 'src/app/pages/requests-overview/requests-overview.model';
import { Router } from '@angular/router';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { ROUTES } from 'src/app/app.constants';
import { getOverviewState } from 'src/common/utils/get-overview-state.fnc';

@Component({
    selector: 'pxe-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends AbstractComponent implements OnInit {

    constructor(
        private cd: ChangeDetectorRef,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }
    public globalError: string[] = [];
    public state: OverviewState;

    public loadingForm = true;
    public overviewStates = OverviewState;

    public electricityPlacesCount = 2;
    public electricitySumOfPerformance = 1.002;
    public gasPlacesCount = 3;
    public gasSumOfPerformance = 4.784;
    public supplyPoints: ISupplyPoint[];

    public supplyPointsEnding: ISupplyPoint[] = [{
        id: '5456',
        name: 'Byt praha',
        allowedOperations: [],
        commodityType: CommodityType.POWER,
        supplier: {
            id: '',
            name: 'PRE',
            vatNumber: '',
            logoPath: '',
            sampleDocuments: [],
        },
        ean: '',
        address: null,
        distributionRate: null,
        circuitBreaker: null,
        phases: null,
        annualConsumptionNT: 0,
        annualConsumptionVT: 0,
        expirationDate: '0',
        subject: null,
        lastAnnualConsumptionNT: 0,
        lastAnnualConsumptionVT: 0,
        lastVersionOfSupplyPoint: false,
        contractEndType: null,
        timeToContractEnd: 0,
        timeToContractEndPeriod: null,
        contract: null,
        progressStatus: ProgressStatus.SUPPLY_POINT,
    }];

    ngOnInit() {
        this.supplyService.findSupplyPointsByContractStatus(null,
            [
                ContractStatus.NOT_CONCLUDED,
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.findSupplyPointsByContractStatus),
            )
            .subscribe(
                (supplyPointsSource: ISupplyPoint[]) => {
                    const { overviewState, supplyPoints } = getOverviewState(supplyPointsSource);
                    this.supplyPoints = supplyPoints;
                    this.state = overviewState;
                    this.cd.markForCheck();
                },
                error => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public routerToListOfSupplyPointsAction = () => {
        this.router.navigate([ROUTES.ROUTER_REQUESTS]);
    }

    public complateRequestAction = () => {
        if (this.supplyPoints.length === 1) {
            this.navigateRequestService.routerToRequestStep(this.supplyPoints[0]);
        } else {
            this.routerToListOfSupplyPointsAction();
        }
    }

    public createSupplyPointAction = () =>  {
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }
}
