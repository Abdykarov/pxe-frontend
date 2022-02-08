import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    AllowedOperations,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { restoreContractAction } from 'src/common/utils/standalone/remove-contract-action.fnc';

@Injectable()
export class UtilsService {
    public restoreContractAction(evt, supplyPointCopy: ISupplyPoint) {
        delete supplyPointCopy['id'];
        restoreContractAction(
            evt,
            supplyPointCopy,
            this.router,
            AllowedOperations.SHOW_DELIVERY_TO
        );
    }

    constructor(private readonly router: Router) {}
}
