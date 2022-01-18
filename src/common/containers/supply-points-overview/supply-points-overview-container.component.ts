import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { AbstractComponent } from 'src/common/abstract.component';
import {
    AllowedOperations,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { restoreContractAction } from 'src/common/utils/standalone/remove-contract-action.fnc';
import {
    configLinksToContractTypes,
    pluralContractType,
} from './supply-points-overview-container.config';
import { SupplyPointsOverviewContainerFacade } from './supply-points-overview-container.facade';
import { ContractTypes } from './supply-points-overview-container.model';

@Component({
    selector: 'pxe-supply-points-overview-container',
    templateUrl: './supply-points-overview-container.component.html',
    styleUrls: ['./supply-points-overview-container.component.scss'],
    providers: [SupplyPointsOverviewContainerFacade],
})
export class SupplyPointsOverviewContainerComponent extends AbstractComponent {
    public readonly ContractTypes = ContractTypes;
    public readonly configLinksToContractTypes = configLinksToContractTypes;
    public readonly pluralContractType = pluralContractType;
    public readonly restoreContractAction = restoreContractAction;
    public readonly today = moment().startOf('days');
    public readonly allowedOperations = AllowedOperations;

    constructor(
        private route: ActivatedRoute,
        public router: Router,
        public supplyPointsOverviewContainerFacade: SupplyPointsOverviewContainerFacade,
        public navigateRequestService: NavigateRequestService
    ) {
        super();
    }

    public changeActiveContractType(ContractTypes: ContractTypes) {
        this.router.navigate([
            `${this.ROUTES.ROUTER_SUPPLY_POINTS}/${ContractTypes}`,
        ]);
    }

    public createSupplyPoint = (event) => {
        event.stopPropagation();
        this.router.navigate([this.ROUTES.ROUTER_REQUEST_SIGNBOARD]);
    };

    public trackSupplyPoint(index, { id }) {
        return id;
    }

    public navigateToSupplyPointDetail({
        contract: { contractId },
        id,
    }: ISupplyPoint) {
        this.router.navigate([
            this.ROUTES.ROUTER_SUPPLY_POINTS,
            id,
            contractId,
        ]);
    }
}
