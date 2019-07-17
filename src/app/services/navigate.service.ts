import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { indexOfSteps } from 'src/common/utils';
import { IsAllowedOperationPipe } from 'src/common/pipes/is-allowed-operation/is-allowed-operation.pipe';
import { AllowedOperations, ISupplyPoint, ProgressStatus } from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class NavigateService {
    constructor(
        private isAllowedOperation: IsAllowedOperationPipe,
        private router: Router,
    ) {}

    public checkCorrectStep  = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) => {
        if (this.isAllowedOperation.transform(supplyPoint, AllowedOperations.SHOW_DELIVERY_TO)) {
            return;
        }

        if (indexOfSteps[supplyPoint.progressStatus] > indexOfSteps[canProgressStatus]) {
            this.router.navigate(
                [this.getNextRouteByProgressStatus(supplyPoint.progressStatus)],
                {
                    queryParams: {
                        supplyPointId: supplyPoint.id,
                    },
                });
        }
    }

    public getNextRouteByProgressStatus = (progressStatus: ProgressStatus): string => {
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
}
