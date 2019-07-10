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
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { inArray } from 'src/common/utils/in-array';
import { IsDatePast } from 'src/common/pipes/is-date-past/is-date-past.pipe';
import { parseGraphQLErrors } from 'src/common/utils';
import {
    OverviewState,
    OverviewStateWrapper,
} from './requests-overview.model';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-requests-overview',
    templateUrl: './requests-overview.component.html',
    styleUrls: ['./requests-overview.component.scss'],
})
export class RequestsOverviewComponent extends AbstractComponent implements OnInit {
    public readonly BANNER_IMAGE_SRC_OK = '/assets/images/illustrations/accepted.svg';

    public globalError: string[] = [];
    public loadingRequests = true;
    public overviewStates = OverviewState;
    public state: OverviewState;
    public supplyPoints: ISupplyPoint[];
    public sourceSupplyPoints: ISupplyPoint[] = null;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private isDatePast: IsDatePast,
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
                (supplyPoints: ISupplyPoint[]) => {
                    this.sourceSupplyPoints = supplyPoints;
                    this.loadingRequests = false;
                    this.setOverviewState(supplyPoints);
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

    public completeRequest = (supplyPoint: ISupplyPoint): void => {
        this.router.navigate(
            [this.getRouterForCompleteRequest(supplyPoint.progressStatus)],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            });
    }

    public newRequest = (evt): void => {
        evt.preventDefault();
        if (R.find(
            (supplyPoint: ISupplyPoint) =>
                inArray(AllowedOperations.SHOW_DELIVERY_TO, supplyPoint.allowedOperations),
        )(this.sourceSupplyPoints)) {
            this.router.navigate(
                [ROUTES.ROUTER_REQUEST_SUPPLY_POINT_SELECTION],
            );
            return;
        }
        this.router.navigate(
            [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
        );
    }

    public isAnyRequest = (supplyPoints: ISupplyPoint[]): boolean =>
        R.find((supplyPoint: ISupplyPoint) => (this.isRequest(supplyPoint)), supplyPoints)

    // supplyPoint.contract === null  je ok?
    public isRequest = (supplyPoint: ISupplyPoint): boolean =>
        supplyPoint.contract === null || supplyPoint.contract.contractStatus === ContractStatus.NOT_CONCLUDED

    public setOverviewState = (supplyPointsInput: ISupplyPoint[]): void => {
        const overviewStateWrapper: OverviewStateWrapper = R.cond([
            [
                R.isEmpty,
                () => ({
                    overviewState: OverviewState.NO_REQUEST,
                    supplyPoints: [],
                }),
            ],
            [
                this.isAnyRequest,
                (supplyPoints: ISupplyPoint[]) => ({
                    overviewState: OverviewState.REQUESTS,
                    supplyPoints: R.filter((supplyPoint: ISupplyPoint) => this.isRequest(supplyPoint), supplyPoints),
                }),
            ],
            // [
            //     this.isAnyContractEnding,
            //     (supplyPoints: ISupplyPoint[]) => ({
            //         overviewState: OverviewState.SOME_SUPPLY_POINTS_ENDING_SUPPLY,
            //         supplyPoints: R.filter((supplyPoint: ISupplyPoint) => this.contractEnding(supplyPoint), supplyPoints),
            //     }),
            // ],
            [
                R.T(),
                (supplyPoints: ISupplyPoint[]) => ({
                    overviewState: OverviewState.ALL_SUPPLY_POINTS_HAVE_SUPPLY_POINTS,
                    supplyPoints: supplyPoints,
                }),
            ],
        ])(supplyPointsInput);

        this.state = overviewStateWrapper.overviewState;
        this.supplyPoints = overviewStateWrapper.supplyPoints;
    }

    public getRouterForCompleteRequest = (progressStatus: ProgressStatus): string => {
        switch (progressStatus) {
            case ProgressStatus.OFFER_STEP: {
                return ROUTES.ROUTER_REQUEST_OFFER_SELECTION;
            }
            case ProgressStatus.PERSONAL_DATA: {
                return ROUTES.ROUTER_REQUEST_RECAPITULATION;
            }
            case ProgressStatus.READY_FOR_SIGN: {
                return ROUTES.ROUTER_REQUEST_CONTRACT;
            }
            case ProgressStatus.WAITING_FOR_PAYMENT: {
                return ROUTES.ROUTER_REQUEST_PAYMENT;
            }
            default: {
                return ROUTES.ROUTER_REQUESTS;
            }
        }
    }

    public createSupplyPoint = (event) => {
        event.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT]);
    }


    // public isAnyContractEnding = (supplyPoints: ISupplyPoint[]): boolean =>
    //     R.find((supplyPoint: ISupplyPoint) => this.contractEnding(supplyPoint), supplyPoints)

    // public contractEnding = (supplyPoint: ISupplyPoint) =>
    //     supplyPoint.contract
    //         && this.dateDiffPipe.transform(
    //             supplyPoint.contract.deliveryTo, moment().add(CONSTS.START_CONTRACT_ENDING , 'month')
    //             .toISOString(), 'seconds') <= 0
    //         && this.dateDiffPipe.transform(moment().toISOString(), supplyPoint.contract.deliveryTo, 'seconds') >= 0
}
