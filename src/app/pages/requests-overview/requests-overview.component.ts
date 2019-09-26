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
import {
    AllowedOperations,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { inArray } from 'src/common/utils';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { parseGraphQLErrors } from 'src/common/utils';
import { OverviewState } from './requests-overview.model';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { getOverviewState } from 'src/common/utils/get-overview-state.fnc';

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

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

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