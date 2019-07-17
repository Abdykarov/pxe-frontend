import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { inArray, indexOfSteps } from 'src/common/utils';
import { ISupplyPoint, ProgressStatus } from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';
import { ContractStatus } from 'src/common/graphql/models/contract';

@Injectable({
    providedIn: 'root',
})
export class NavigateService {
    constructor(
        private router: Router,
    ) {}

    public checkCorrectStep  = (supplyPoint: ISupplyPoint, canProgressStatus: ProgressStatus) => {
        const isEditable = !supplyPoint.contract ||
            inArray(supplyPoint.contract.contractStatus,
            [
                ContractStatus.NOT_CONCLUDED,
                ContractStatus.WAITING_FOR_PAYMENT,
            ]);

        if (!isEditable) {
            this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
        }

        if (indexOfSteps[supplyPoint.progressStatus] > indexOfSteps[canProgressStatus]) {
            if (supplyPoint.contract.contractStatus === ContractStatus.CONCLUDED && canProgressStatus === ProgressStatus.COMPLETED) {
                return true;
            }

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
