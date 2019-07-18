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
export class NavigateService {
    constructor(
        private isAllowedOperation: IsAllowedOperationPipe,
        private router: Router,
    ) {}

    private canGoToStep = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) => {
        return true;
        return indexOfSteps[supplyPoint.progressStatus] <= indexOfSteps[canProgressStatus];
    }

    private routerToRequestStep = (supplyPoint: ISupplyPoint, progressStatus: ProgressStatus = null) => {
        this.router.navigate(
            [this.getNextRouteByProgressStatus(progressStatus === null ? supplyPoint.progressStatus : progressStatus)],
            {
                queryParams: {
                    supplyPointId: supplyPoint.id,
                },
            });
    }

    public checkCorrectStep  = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) => {
        return;
        if (R.path(['contract', 'contractStatus'], supplyPoint) === ContractStatus.CONCLUDED) {
            // router to complate
            return;
        }

        if (!this.canGoToStep(supplyPoint, canProgressStatus)) {
            this.router.navigate(
                [this.getNextRouteByProgressStatus(supplyPoint.progressStatus)],
                {
                    queryParams: {
                        supplyPointId: supplyPoint.id,
                    },
                });
        }
    }

    public backStep = (supplyPoint: ISupplyPoint, progressStatus: ProgressStatus) => {
        console.log('ZAVOLAM SE S TEMITO PARAMETRY');
        console.log(supplyPoint);
        console.log(progressStatus);
        console.log(this.canGoToStep(supplyPoint, progressStatus));

        if (this.canGoToStep(supplyPoint, progressStatus)) {
            this.routerToRequestStep(supplyPoint, progressStatus);
            return;
        }

        this.routerToRequestStep(supplyPoint);
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
