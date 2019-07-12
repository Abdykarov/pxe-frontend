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
import { NavigateService } from 'src/app/services/navigate.service';
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
        private navigateService: NavigateService,
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

    public completeRequestAction = (supplyPoint: ISupplyPoint): void => {
        this.router.navigate(
            [this.navigateService.getNextRouteByProgressStatus(supplyPoint.progressStatus)],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            });
    }

    public newRequstAction = (evt): void => {
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

    public hasAnyRequest = (supplyPoints: ISupplyPoint[]): boolean =>
        R.find((supplyPoint: ISupplyPoint) => (this.isSupplyPointInRequestState(supplyPoint)), supplyPoints)

    public isSupplyPointInRequestState = (supplyPoint: ISupplyPoint): boolean =>
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
                this.hasAnyRequest,
                (supplyPoints: ISupplyPoint[]) => ({
                    overviewState: OverviewState.REQUESTS,
                    supplyPoints: R.filter((supplyPoint: ISupplyPoint) => this.isSupplyPointInRequestState(supplyPoint), supplyPoints),
                }),
            ],
            // [
            //     this.isAnyContractEnding,
            //     (supplyPoints: ISupplyPoint[]) => ({
            //         overviewState: OverviewState.SOME_SUPPLY_POINTS_ARE_ENDING ,
            //         supplyPoints: R.filter((supplyPoint: ISupplyPoint) => this.contractEnding(supplyPoint), supplyPoints),
            //     }),
            // ],
            [
                R.T(),
                () => ({
                    overviewState: OverviewState.NO_REQUEST_WITH_VALID_CONTRACT,
                }),
            ],
        ])(supplyPointsInput);

        this.state = overviewStateWrapper.overviewState;
        this.supplyPoints = overviewStateWrapper.supplyPoints;
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
    //             supplyPoint.contract.deliveryTo, moment().add(CONSTS.MONTHS_TO_CONTRACT_END , 'month')
    //             .toISOString(), 'seconds') <= 0
    //         && this.dateDiffPipe.transform(moment().toISOString(), supplyPoint.contract.deliveryTo, 'seconds') >= 0
}
