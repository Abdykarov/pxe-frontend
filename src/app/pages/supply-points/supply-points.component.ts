import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';
import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    AllowedOperations,
    ISupplyPoint,
    ISupplyPointStatistic, ISupplyPointStatisticView,
} from 'src/common/graphql/models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { IsDatePast } from 'src/common/pipes/is-date-past/is-date-past.pipe';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'lnd-supply-points',
    templateUrl: './supply-points.component.html',
    styleUrls: ['./supply-points.component.scss'],
})
export class SupplyPointsComponent extends AbstractComponent implements OnInit {

    public allowedOperations = AllowedOperations;
    public dataLoading = true;
    public error = false;
    public errorMessages = [];
    public supplyPoints: ISupplyPoint[];
    public supplyPointsFuture: ISupplyPoint[];
    public supplyPointsActual: ISupplyPoint[];
    public supplyPointStatistic: ISupplyPointStatistic;
    public today = new Date().toISOString();

    constructor(
        private cd: ChangeDetectorRef,
        private isDatePast: IsDatePast,
        private navigateRequestService: NavigateRequestService,
        private supplyService: SupplyService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    ngOnInit () {
        super.ngOnInit();

        this.supplyService.findSupplyPointsByContractStatus([
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                map( ({data}) => data.findSupplyPointsByContractStatus),
                switchMap((supplyPoints: ISupplyPoint[]) => {
                    this.supplyPoints = supplyPoints;

                    this.supplyPointsActual =
                        R.pipe(
                            R.filter(
                                (supplyPoint: ISupplyPoint) =>
                                    moment()
                                        .isBetween(
                                            moment(supplyPoint.contract.deliveryFrom),
                                            moment(supplyPoint.contract.deliveryTo),
                                        ),
                            ),
                            R.sort(R.ascend(R.path(['contract', 'deliveryFrom']))),
                        )(supplyPoints);

                    this.supplyPointsFuture =
                        R.pipe(
                            R.filter(
                                (supplyPoint: ISupplyPoint) =>
                                    this.isDatePast.transform(supplyPoint.contract.deliveryFrom),
                            ),
                            R.sort(R.ascend(R.path(['contract', 'deliveryFrom']))),
                        )(supplyPoints);

                    if (this.supplyPoints.length) {
                        return of({
                            data: {
                                computeAndGetSupplyPointStatistics: {},
                            },
                        });
                    }
                    return this.supplyService.computeAndGetSupplyPointStatistics();
                }),
                map(({data}) =>  data.computeAndGetSupplyPointStatistics),
                takeUntil(this.destroy$),
            ).subscribe(
            (supplyPointStatistic: ISupplyPointStatistic) => {
                    this.dataLoading = false;
                    this.supplyPointStatistic = supplyPointStatistic;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.dataLoading = false;
                    this.error = true;
                    const { globalError } = parseGraphQLErrors(error);
                    this.errorMessages = globalError;
                    this.cd.markForCheck();
                });
    }


    public createSupplyPoint = (event) => {
        event.stopPropagation();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }

    public navigateToSupplyPointDetail = ({id}: ISupplyPoint) => {
        this.router.navigate(
            [id],
            {
                relativeTo: this.route,
            },
        );
    }

    public restoreContractAction = (evt, supplyPoint: ISupplyPoint) => {
        evt.preventDefault();
        evt.cancelBubble = true;

        const state = {
            supplyPointCopy: {
                ...supplyPoint,
            },
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

    public navigateToRequests = () => {
        this.router.navigate([ROUTES.ROUTER_REQUESTS]);
    }
}
