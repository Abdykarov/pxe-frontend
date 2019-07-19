import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';

import { ContractStatus } from 'src/common/graphql/models/contract';
import { indexOfSteps } from 'src/common/utils';
import { IsAllowedOperationPipe } from 'src/common/pipes/is-allowed-operation/is-allowed-operation.pipe';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class NavigateSupplyPointService {
    constructor(
        private isAllowedOperation: IsAllowedOperationPipe,
        private router: Router,
    ) {}

    private canGoToStep = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) =>
        this.isPreviousStep(supplyPoint, canProgressStatus) || this.isProgressStatusStep(supplyPoint, canProgressStatus)

    public routerToRequestStep = (supplyPoint: ISupplyPoint, progressStatus: ProgressStatus = null) => {
        this.router.navigate(
            [this.getNextRouteByProgressStatus(progressStatus === null ? supplyPoint.progressStatus : progressStatus)],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            });
        }

    public isPreviousStep = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) =>
        indexOfSteps[canProgressStatus] < indexOfSteps[supplyPoint.progressStatus]

    public isProgressStatusStep = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) =>
        indexOfSteps[supplyPoint.progressStatus] === indexOfSteps[canProgressStatus]

    public checkCorrectStep  = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) => {
        if (R.path(['contract', 'contractStatus'], supplyPoint) === ContractStatus.CONCLUDED) {
            // router to complate
            return;
        }

        if (!this.canGoToStep(supplyPoint, canProgressStatus)) {
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
}
