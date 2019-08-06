import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';

import { ContractStatus } from 'src/common/graphql/models/contract';
import { indexOfSteps } from 'src/common/utils';
import {
    ISupplyPoint,
    ISupplyPointStatisticView,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class NavigateRequestService {
    constructor(
        private router: Router,
    ) {}

    private canGoToStep = (supplyPoint: ISupplyPoint, allowedProgressStatus: ProgressStatus) =>
        this.isPreviousStep(supplyPoint, allowedProgressStatus) || this.isProgressStatusStep(supplyPoint, allowedProgressStatus)

    public routerToRequestStep = (supplyPoint: ISupplyPoint | ISupplyPointStatisticView, progressStatus: ProgressStatus = null) => {
        this.router.navigate(
            [this.getNextRouteByProgressStatus(progressStatus === null ? supplyPoint.progressStatus : progressStatus)],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            });
        }

    public isPreviousStep = (supplyPoint: ISupplyPoint, allowedProgressStatus: ProgressStatus) =>
        indexOfSteps[allowedProgressStatus] < indexOfSteps[supplyPoint.progressStatus]

    public isProgressStatusStep = (supplyPoint: ISupplyPoint, allowedProgressStatus: ProgressStatus) =>
        indexOfSteps[supplyPoint.progressStatus] === indexOfSteps[allowedProgressStatus]

    public checkCorrectStep  = (supplyPoint: ISupplyPoint, allowedProgressStatus: ProgressStatus) => {
        if (R.path(['contract', 'contractStatus'], supplyPoint) === ContractStatus.CONCLUDED) {
            this.routerToRequestStep(supplyPoint, ProgressStatus.WAITING_FOR_PAYMENT);
            return;
        }

        if (!this.canGoToStep(supplyPoint, allowedProgressStatus)) {
            this.routerToRequestStep(supplyPoint);
        }
    }

    public getNextRouteByProgressStatus = (progressStatus: ProgressStatus): string => {
        switch (progressStatus) {
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
    }

    public backStepAction = (supplyPoint: ISupplyPoint, progressStatus: ProgressStatus) => {
        if (this.canGoToStep(supplyPoint, progressStatus)) {
            this.routerToRequestStep(supplyPoint, progressStatus);
            return;
        }

        this.routerToRequestStep(supplyPoint);
    }

}
