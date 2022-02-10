import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import {
    AllowedOperations,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { NavigateConsumerService } from 'src/common/services/navigate-consumer.service';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    constructor(
        private readonly navigateConsumerService: NavigateConsumerService,
        private readonly router: Router,
        protected supplyPointService: SupplyService
    ) {}

    public restoreContractAction(
        evt,
        supplyPointCopy: ISupplyPoint,
        allowedOperation: AllowedOperations = AllowedOperations.SHOW_DELIVERY_TO
    ) {
        delete supplyPointCopy['id'];
        evt.preventDefault();
        evt.cancelBubble = true;

        const state = {
            supplyPointCopy,
        };

        if (allowedOperation === AllowedOperations.SHOW_DELIVERY_TO) {
            this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                ProgressStatus.SUPPLY_POINT,
                null,
                state
            );
        } else if (
            allowedOperation === AllowedOperations.FINALIZE_NEXT_CONTRACT
        ) {
            this.navigateConsumerService.checkCorrectStep(
                supplyPointCopy,
                ProgressStatus.COMPLETED
            );
        } else if (
            allowedOperation === AllowedOperations.CREATE_FROM_HISTORY_CONTRACT
        ) {
            delete state.supplyPointCopy['id'];
            this.navigateConsumerService.navigateToRequestStepByProgressStatus(
                ProgressStatus.SUPPLY_POINT,
                null,
                state
            );
        } else if (
            allowedOperation ===
            AllowedOperations.FINALIZE_FROM_HISTORY_CONTRACT
        ) {
            this.redirectToNewVersionOfSupplyPoint(
                supplyPointCopy.closedByContractEntityId
            );
        } else if (
            allowedOperation ===
            AllowedOperations.SHOW_CREATED_CONTRACT_FROM_HISTORY
        ) {
            this.redirectDetailFromHistory(
                supplyPointCopy.closedByContractEntityId
            );
        } else {
            this.navigateConsumerService.navigateToSupplyPointDetail(
                supplyPointCopy.id,
                supplyPointCopy.contract.nextContractId
            );
        }
    }

    private readonly redirectToNewVersionOfSupplyPoint = (contractId) => {
        this.supplyPointService
            .getByContractId(contractId)
            .pipe(
                take(1),
                map(({ data }) => data.findSupplyPointByContractId)
            )
            .subscribe((suppyPoint: ISupplyPoint) =>
                this.navigateConsumerService.checkCorrectStep(
                    suppyPoint,
                    ProgressStatus.COMPLETED
                )
            );
    };

    private readonly redirectDetailFromHistory = (contractId) => {
        this.supplyPointService
            .getByContractId(contractId)
            .pipe(
                take(1),
                map(({ data }) => data.findSupplyPointByContractId)
            )
            .subscribe((suppyPoint: ISupplyPoint) => {
                this.navigateConsumerService.navigateToSupplyPointDetail(
                    suppyPoint.id,
                    contractId
                );
            });
    };
}
