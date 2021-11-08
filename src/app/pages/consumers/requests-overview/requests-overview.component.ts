import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
    CONSTS,
    RequestsOverviewBannerShow,
    ROUTES,
} from 'src/app/app.constants';
import { confirmDeleteRequest } from 'src/app/pages/consumers/requests-overview/requests-overview.config';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    AllowedOperations,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { DateDiffPipe } from 'src/common/pipes/secured/date-diff/date-diff.pipe';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
    inArray,
    isDataAvailable,
    parseGraphQLErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import { getOverviewState } from 'src/common/utils/get-overview-state.fnc';
import { OverviewState } from './requests-overview.model';

@Component({
    selector: 'pxe-requests-overview',
    templateUrl: './requests-overview.component.html',
    styleUrls: ['./requests-overview.component.scss'],
})
export class RequestsOverviewComponent
    extends AbstractComponent
    implements OnInit
{
    public readonly BANNER_TYPE_ACCEPTED = BannerTypeImages.ACCEPTED;

    public globalError: string[] = [];
    public loadingRequests = true;
    public overviewStates = OverviewState;
    public requestsOverviewBannerShow = RequestsOverviewBannerShow.NONE;
    public RequestsOverviewBannersShow = RequestsOverviewBannerShow;
    public state: OverviewState;
    public supplyPoints: ISupplyPoint[];
    public sourceSupplyPoints: ISupplyPoint[] = null;
    public deletedRequest: ISupplyPoint = null;

    @ViewChild('deletedRequestInfo')
    public deletedRequestInfo: ElementRef;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private modalsService: ModalService,
        private navigateRequestService: NavigateRequestService,
        private router: Router,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super();
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.requestsOverviewBannerShow =
                R.path(
                    ['history', 'state', 'requestsOverviewBannerShow'],
                    window
                ) || RequestsOverviewBannerShow.NONE;
        }

        this.supplyService
            .findSupplyPointsByContractStatus([
                ContractStatus.NOT_CONCLUDED,
                ContractStatus.CONCLUDED,
            ])
            .pipe(
                takeUntil(this.destroy$),
                filter(isDataAvailable),
                map(({ data }) => data.findSupplyPointsByContractStatus)
            )
            .subscribe(
                (supplyPointsSource: ISupplyPoint[]) => {
                    this.sourceSupplyPoints = supplyPointsSource;
                    this.loadingRequests = false;
                    const { overviewState, supplyPoints } =
                        getOverviewState(supplyPointsSource);
                    this.supplyPoints = supplyPoints;
                    this.state = overviewState;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.supplyPoints = null;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );

        this.modalsService.closeModalData$
            .pipe(
                takeUntil(this.destroy$),
                filter(
                    R.allPass([
                        R_.isNotNil,
                        R.propEq(
                            'modalType',
                            CONSTS.MODAL_TYPE.CONFIRM_DELETE_REQUEST
                        ),
                    ])
                )
            )
            .subscribe((modal) => {
                if (modal.confirmed) {
                    this.supplyService
                        .deleteUnfinishedSupplyPoint(modal.data.id)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            (_) => {
                                this.sourceSupplyPoints = R.filter(
                                    (supplyPoint: ISupplyPoint) =>
                                        R.path(
                                            ['identificationNumber'],
                                            supplyPoint
                                        ) !== modal.data.identificationNumber
                                )(this.sourceSupplyPoints);
                                const { overviewState, supplyPoints } =
                                    getOverviewState(this.sourceSupplyPoints);
                                this.supplyPoints = supplyPoints;
                                this.state = overviewState;
                                this.deletedRequest = modal.data;
                                setTimeout(() =>
                                    scrollToElementFnc(
                                        this.deletedRequestInfo.nativeElement
                                    )
                                );
                                this.cd.markForCheck();
                            },
                            (error) => {
                                const { globalError } =
                                    parseGraphQLErrors(error);
                                this.globalError = globalError;
                                this.cd.markForCheck();
                            }
                        );
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    public completeRequestAction = (supplyPoint: ISupplyPoint): void =>
        this.navigateRequestService.routerToRequestStep(supplyPoint);

    public removeRequestAction = (supplyPoint: ISupplyPoint): void =>
        this.modalsService.showModal$.next(confirmDeleteRequest(supplyPoint));

    public newRequestAction = (evt): void => {
        evt.preventDefault();
        const lastSupplyPointsWithConcludedContract = R.find(
            (supplyPoint: ISupplyPoint) =>
                supplyPoint.allowedOperations &&
                inArray(
                    AllowedOperations.SHOW_DELIVERY_TO,
                    supplyPoint.allowedOperations
                )
        )(this.sourceSupplyPoints);

        if (lastSupplyPointsWithConcludedContract) {
            this.router.navigate([
                ROUTES.ROUTER_REQUEST_SUPPLY_POINT_SELECTION,
            ]);
            return;
        }
        this.router.navigate([ROUTES.ROUTER_REQUEST_SIGNBOARD]);
    };

    public createSupplyPoint = (event) => {
        event.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SIGNBOARD]);
    };
}
