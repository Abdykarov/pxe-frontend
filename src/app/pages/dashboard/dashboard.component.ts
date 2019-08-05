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
    ISupplyPoint,
    ISupplyPointStatistic,
} from 'src/common/graphql/models/supply.model';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

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
    public loadingData = true;
    public supplyPoints: ISupplyPoint[];
    public supplyPointStatistic: ISupplyPointStatistic;

    ngOnInit() {
        this.supplyService.computeAndGetSupplyPointStatistics()
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) =>  data.computeAndGetSupplyPointStatistics),
            )
            .subscribe(
                (supplyPointStatistic: ISupplyPointStatistic) => {
                    this.loadingData = false;
                    this.supplyPointStatistic = supplyPointStatistic;
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

    public completeRequestAction = () => {
        if (this.supplyPoints.length === 1) {
            this.navigateRequestService.routerToRequestStep(this.supplyPoints[0]);
        } else {
            this.routerToListOfSupplyPointsAction();
        }
    }

    public createSupplyPointAction = () =>  {
        const queryParams = R.cond([
            [
                (supplyPoints: ISupplyPoint[]) => supplyPoints.length === 1,
                (supplyPoints: ISupplyPoint[]) =>
                    ({
                            supplyPointId: supplyPoints[0].id,
                    }),
            ],
            [R.T, () => ({})],
        ])(this.supplyPoints);

        this.router.navigate(
            [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
            {
                queryParams,
            },
        );
    }
}
