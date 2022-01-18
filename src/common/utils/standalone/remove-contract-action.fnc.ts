import { Router } from '@angular/router';
import { ROUTES } from 'src/app/app.constants';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import {
    AllowedOperations,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';

export const restoreContractAction = (
    evt,
    supplyPointCopy: ISupplyPoint,
    router: Router,
    allowedOperation: AllowedOperations,
    navigateRequestService: NavigateRequestService = null
) => {
    evt.preventDefault();
    evt.cancelBubble = true;

    const state = {
        supplyPointCopy,
    };

    if (allowedOperation === AllowedOperations.SHOW_DELIVERY_TO) {
        router.navigate([ROUTES.ROUTER_REQUEST_SUPPLY_POINT], { state });
    } else if (allowedOperation === AllowedOperations.FINALIZE_NEXT_CONTRACT) {
        navigateRequestService.checkCorrectStep(
            supplyPointCopy,
            ProgressStatus.COMPLETED
        );
    } else {
        router.navigate([
            `${ROUTES.ROUTER_SUPPLY_POINTS}/${supplyPointCopy.id}/${supplyPointCopy.contract.nextContractId}`,
        ]);
    }
};
