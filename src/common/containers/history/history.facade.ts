import { Router } from '@angular/router';
import { AbstractFacade } from 'src/common/abstract.facade';
import {
    AllowedOperations,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { restoreContractAction } from 'src/common/utils/standalone/remove-contract-action.fnc';

export abstract class HistoryFacade extends AbstractFacade {
    public restoreContractAction(
        evt,
        supplyPointCopy: ISupplyPoint,
        router: Router
    ) {
        delete supplyPointCopy['id'];
        restoreContractAction(
            evt,
            supplyPointCopy,
            router,
            AllowedOperations.SHOW_DELIVERY_TO
        );
    }
}
