import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { map, takeUntil, windowWhen } from 'rxjs/operators';
import { ROUTES } from 'src/app/app.constants';
import { ContractActions } from 'src/app/pages/supply-points/models/supply-point-detail.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';

import { AbstractComponent } from 'src/common/abstract.component';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { AllowedOperations, ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { inArray, parseGraphQLErrors } from 'src/common/utils';
import { getOverviewState } from 'src/common/utils/get-overview-state.fnc';
import { OverviewState } from './requests-overview.model';

@Component({
    selector: 'pxe-requests-overview',
    templateUrl: './requests-overview.component.html',
    styleUrls: ['./requests-overview.component.scss'],
})
export class RequestsOverviewComponent extends AbstractComponent implements OnInit {
    public readonly BANNER_TYPE_ACCEPTED = BannerTypeImages.ACCEPTED;

    public globalError: string[] = [];
    public loadingRequests = true;
    public overviewStates = OverviewState;
    public state: OverviewState;
    public supplyPoints: ISupplyPoint[];
    public sourceSupplyPoints: ISupplyPoint[] = null;
    public contractActions = ContractActions;
    public contractAction = ContractActions.NONE;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            console.log(window.history.state);
            console.log(R.path(['history', 'state', 'contractAction'], window) );
            this.contractAction = R.path(['history', 'state', 'contractAction'], window) || ContractActions.NONE;
        }

        this.supplyService.findSupplyPointsByContractStatus([
                ContractStatus.NOT_CONCLUDED,
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.findSupplyPointsByContractStatus),
            )
            .subscribe(
                (supplyPointsSource: ISupplyPoint[]) => {
                    this.sourceSupplyPoints = supplyPointsSource;
                    this.loadingRequests = false;
                    const { overviewState, supplyPoints } = getOverviewState(supplyPointsSource);
                    this.supplyPoints = supplyPoints;
                    this.state = overviewState;
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

    public completeRequestAction = (supplyPoint: ISupplyPoint): void => {
        this.navigateRequestService.routerToRequestStep(supplyPoint);
    }

    public newRequestAction = (evt): void => {
        evt.preventDefault();
        const lastSupplyPointsWithConcludedContract = R.find(
            (supplyPoint: ISupplyPoint) =>
                inArray(AllowedOperations.SHOW_DELIVERY_TO, supplyPoint.allowedOperations),
        )(this.sourceSupplyPoints);

        if (lastSupplyPointsWithConcludedContract) {
            this.router.navigate(
                [ROUTES.ROUTER_REQUEST_SUPPLY_POINT_SELECTION],
            );
            return;
        }
        this.router.navigate(
            [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
        );
    }

    public createSupplyPoint = (event) => {
        event.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }
}
