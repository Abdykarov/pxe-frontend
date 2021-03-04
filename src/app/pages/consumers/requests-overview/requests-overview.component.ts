import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    filter,
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
import {
    CONSTS,
    RequestsOverviewBannerShow,
    ROUTES,
} from 'src/app/app.constants';
import { confirmDeleteRequest } from 'src/app/pages/consumers/requests-overview/requests-overview.config';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { getOverviewState } from 'src/common/utils/get-overview-state.fnc';
import {
    inArray,
    parseGraphQLErrors,
} from 'src/common/utils';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { OverviewState } from './requests-overview.model';
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
    public requestsOverviewBannerShow = RequestsOverviewBannerShow.NONE;
    public RequestsOverviewBannersShow = RequestsOverviewBannerShow;
    public state: OverviewState;
    public supplyPoints: ISupplyPoint[];
    public sourceSupplyPoints: ISupplyPoint[] = null;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private modalsService: ModalService,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.requestsOverviewBannerShow =
                R.path(['history', 'state', 'requestsOverviewBannerShow'], window) || RequestsOverviewBannerShow.NONE;
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

        this.modalsService.closeModalData$
            .pipe(
                filter(
                    R.allPass([
                        R_.isNotNil,
                        R.propEq('modalType', CONSTS.MODAL_TYPE.CONFIRM_DELETE_REQUEST),
                    ]),
                ),
            )
            .subscribe(modal => {
                if (modal.confirmed) {
                    this.supplyService.deleteUnfinishedSupplyPoint(modal.data.id)
                        .pipe(
                            takeUntil(this.destroy$),
                        )
                        .subscribe(
                            _ => {
                                this.sourceSupplyPoints = R.filter(
                                    (supplyPoint: ISupplyPoint) =>
                                        R.path(['contract', 'contractId'], supplyPoint) !== modal.data.contract.contractId,
                                )(this.sourceSupplyPoints);
                                const { overviewState, supplyPoints } = getOverviewState(this.sourceSupplyPoints);
                                this.supplyPoints = supplyPoints;
                                this.state = overviewState;
                                this.cd.markForCheck();
                            },
                            (error) => {
                                const { globalError } = parseGraphQLErrors(error);
                                this.globalError = globalError;
                                this.cd.markForCheck();
                            },
                        );
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    public completeRequestAction = (supplyPoint: ISupplyPoint): void => this.navigateRequestService.routerToRequestStep(supplyPoint);

    public removeRequestAction = (supplyPoint: ISupplyPoint): void => this.modalsService
        .showModal$.next(confirmDeleteRequest(supplyPoint))

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
            [ROUTES.ROUTER_REQUEST_SIGNBOARD],
        );
    }

    public createSupplyPoint = (event) => {
        event.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SIGNBOARD]);
    }
}
