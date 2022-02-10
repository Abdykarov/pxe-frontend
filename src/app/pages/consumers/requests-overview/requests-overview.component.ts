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
import { CONSTS, RequestsOverviewBannerShow } from 'src/app/app.constants';
import { confirmDeleteRequest } from 'src/app/pages/consumers/requests-overview/requests-overview.config';
import { AbstractComponent } from 'src/common/abstract.component';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { DateDiffPipe } from 'src/common/pipes/secured/date-diff/date-diff.pipe';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
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
    public deletedRequest: ISupplyPoint = null;

    @ViewChild('deletedRequestInfo')
    public deletedRequestInfo: ElementRef;

    constructor(
        private cd: ChangeDetectorRef,
        private dateDiffPipe: DateDiffPipe,
        private modalsService: ModalService,
        private navigateConsumerService: NavigateConsumerService,
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
            .findSupplyPointsByContractStatus([ContractStatus.NOT_CONCLUDED])
            .pipe(
                takeUntil(this.destroy$),
                filter(isDataAvailable),
                map(({ data }) => data.findSupplyPointsByContractStatus)
            )
            .subscribe(
                (supplyPointsSource: ISupplyPoint[]) => {
                    this.loadingRequests = false;
                    const { overviewState, supplyPoints } =
                        getOverviewState(supplyPointsSource);
                    this.supplyPoints = supplyPointsSource;
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
                                this.supplyPoints = R.filter(
                                    (supplyPoint: ISupplyPoint) =>
                                        R.path(
                                            ['identificationNumber'],
                                            supplyPoint
                                        ) !== modal.data.identificationNumber
                                )(this.supplyPoints);
                                const { overviewState, supplyPoints } =
                                    getOverviewState(this.supplyPoints);
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
        this.navigateConsumerService.routerToRequestStep(supplyPoint);

    public removeRequestAction = (supplyPoint: ISupplyPoint): void =>
        this.modalsService.showModal$.next(confirmDeleteRequest(supplyPoint));

    public createSupplyPoint = (evt): void => {
        evt.preventDefault();
        this.navigateConsumerService.navigateToRequestStepByProgressStatus(
            ProgressStatus.SIGNBOARD
        );
    };
}
