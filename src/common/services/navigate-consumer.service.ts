import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { ROUTES } from 'src/app/app.constants';
import { ContractTypes } from 'src/common/containers/supply-points-overview/supply-points-overview-container.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    ISupplyPoint,
    ISupplyPointStatisticView,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { indexOfSteps } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class NavigateConsumerService {
    constructor(private router: Router) {}

    public canGoToStep = (
        supplyPoint: ISupplyPoint,
        allowedProgressStatus: ProgressStatus
    ) =>
        this.isPreviousStep(supplyPoint, allowedProgressStatus) ||
        this.isProgressStatusStep(supplyPoint, allowedProgressStatus);

    // dont want to destroy something
    public routerToRequestStep = (
        supplyPoint: ISupplyPoint | ISupplyPointStatisticView,
        progressStatus: ProgressStatus = null
    ) => {
        this.router.navigate(
            [
                this.getNextRouteByProgressStatus(
                    progressStatus === null
                        ? supplyPoint.progressStatus
                        : progressStatus
                ),
            ],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            }
        );
    };

    public navigateToRequestStepByProgressStatus = (
        progressStatus: ProgressStatus,
        queryParams = null,
        state = null
    ) => {
        this.router.navigate(
            [this.getNextRouteByProgressStatus(progressStatus)],
            {
                queryParams,
                state,
            }
        );
    };

    public isPreviousStep = (
        supplyPoint: ISupplyPoint,
        allowedProgressStatus: ProgressStatus
    ) =>
        indexOfSteps[allowedProgressStatus] <
        indexOfSteps[supplyPoint.progressStatus];

    public isProgressStatusStep = (
        supplyPoint: ISupplyPoint,
        allowedProgressStatus: ProgressStatus
    ) =>
        indexOfSteps[supplyPoint.progressStatus] ===
        indexOfSteps[allowedProgressStatus];

    public checkCorrectStep = (
        supplyPoint: ISupplyPoint,
        allowedProgressStatus: ProgressStatus
    ) => {
        const currentStatus = R.path(
            ['contract', 'contractStatus'],
            supplyPoint
        );
        const isFinishedRequest =
            R.indexOf(currentStatus, [
                ContractStatus.CONCLUDED,
                ContractStatus.CANCELED,
                ContractStatus.TO_BE_CANCELED,
            ]) >= 0;
        if (isFinishedRequest) {
            this.routerToRequestStep(
                supplyPoint,
                ProgressStatus.WAITING_FOR_PAYMENT
            );
            return;
        }

        if (!this.canGoToStep(supplyPoint, allowedProgressStatus)) {
            this.routerToRequestStep(supplyPoint);
        }
    };

    public getNextRouteByProgressStatus = (
        progressStatus: ProgressStatus
    ): string => {
        switch (progressStatus) {
            case ProgressStatus.SIGNBOARD: {
                return ROUTES.ROUTER_REQUEST_SIGNBOARD;
            }
            case ProgressStatus.SUPPLY_POINT: {
                return ROUTES.ROUTER_REQUEST_SUPPLY_POINT;
            }
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
    };

    public backStepAction = (
        supplyPoint: ISupplyPoint,
        progressStatus: ProgressStatus
    ) => {
        if (this.canGoToStep(supplyPoint, progressStatus)) {
            this.routerToRequestStep(supplyPoint, progressStatus);
            return;
        }

        this.routerToRequestStep(supplyPoint);
    };

    public navigateToRequests = (state = null) => {
        this.router.navigate([ROUTES.ROUTER_REQUESTS], {
            state,
        });
    };

    public navigateToSupplyPoints = (
        contractTypes: ContractTypes = ContractTypes.ACTIVE
    ) => {
        this.router.navigate([
            `${ROUTES.ROUTER_SUPPLY_POINTS}/${contractTypes}`,
        ]);
    };

    public navigateToSupplyPointDetail = (supplyPointId, contractId) => {
        this.router.navigate([
            `${ROUTES.ROUTER_SUPPLY_POINTS}/${supplyPointId}/${contractId}`,
        ]);
    };

    public navigateToUserProfile = () => {
        this.router.navigate([ROUTES.ROUTER_USER_PROFILE]);
    };

    public navigateToDeleteProfile = () => {
        this.router.navigate([ROUTES.ROUTER_DELETE_ACCOUNT]);
    };
}
