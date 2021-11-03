import { Router } from '@angular/router';

import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { ROUTES } from 'src/app/app.constants';

export const restoreContractAction = (
    evt,
    supplyPoint: ISupplyPoint,
    router: Router,
) => {
    evt.preventDefault();
    evt.cancelBubble = true;

    const state = {
        supplyPointCopy: {
            ...supplyPoint,
        },
    };

    router.navigate(
        [ROUTES.ROUTER_REQUEST_SUPPLY_POINT],
        {state},
    );
};
