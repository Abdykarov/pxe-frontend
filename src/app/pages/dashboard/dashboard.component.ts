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
    ISupplyPointStatistic,
    ISupplyPointStatisticView,
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
    public globalError: string[] = [];
    public loadingData = true;
    public supplyPointStatistic: ISupplyPointStatistic;

    constructor(
        private cd: ChangeDetectorRef,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        // this.supplyService.computeAndGetSupplyPointStatistics()
        //     .pipe(
        //         takeUntil(this.destroy$),
        //         map(({data}) =>  data.computeAndGetSupplyPointStatistics),
        //     )
        //     .subscribe(
        //         (supplyPointStatistic: ISupplyPointStatistic) => {
        //             this.loadingData = false;
        //             this.supplyPointStatistic = supplyPointStatistic;
        //             this.cd.markForCheck();
        //         },
        //         error => {
        //             const { globalError } = parseGraphQLErrors(error);
        //             this.globalError = globalError;
        //             this.cd.markForCheck();
        //         },
        //     );

        this.supplyService.findSupplyPoints()
            .pipe(
                map(({data}) => data.findSupplyPoints),
                takeUntil(this.destroy$),
            )
            .subscribe((data) => {
                console.log('%c ***** data *****', 'background: #bada55; color: #000; font-weight: bold', data);
            });
    }

    public navigateToSupplyPoints = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }

    public navigateToRequests = () => {
        this.router.navigate([ROUTES.ROUTER_REQUESTS]);
    }

    public navigateToNewSupplyPoint = (supplyPointId: string | number = null) => {
        const state = {
            supplyPointId,
        };
        this.router.navigate(
            [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
            {state});
    }

    public completeRequestAction = (notConcludedItems: ISupplyPointStatisticView[]) => {
        R.cond([
            [
                (items: ISupplyPointStatisticView[]) => R.equals(1, items.length),
                (items: ISupplyPointStatisticView[]) => {
                    const notConcludedItem = items[0];
                    this.navigateRequestService.routerToRequestStep(notConcludedItem);
                },
            ],
            [
                R.T,
                () => this.navigateToRequests(),
            ],
        ])(notConcludedItems);
    }

    public supplierAction = (showDeliveryItems: ISupplyPointStatisticView[]) =>  {
        R.cond([
            [
                (items: ISupplyPointStatisticView[]) => R.equals(1, items.length),
                (items: ISupplyPointStatisticView[]) => {
                    const supplyPointId = items[0].id;
                    this.navigateToNewSupplyPoint(supplyPointId);
                },
            ],
            [
                R.T,
                () => this.navigateToSupplyPoints(),
            ],
        ])(showDeliveryItems);
    }
}
