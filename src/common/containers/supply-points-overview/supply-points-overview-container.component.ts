import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { SupplyPointUtilsService } from 'src/app/services/supply-point-utils.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { UtilsService } from 'src/common/containers/supply-point-detail/services/utils.service';
import {
    AllowedOperations,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
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
    public readonly configLinksToContractTypes = configLinksToContractTypes;
    public readonly pluralContractType = pluralContractType;
    public readonly today = moment().startOf('days');
    public readonly allowedOperations = AllowedOperations;

    constructor(
        public completeRequestAction: SupplyPointUtilsService,
        public navigateConsumerService: NavigateConsumerService,
        public router: Router,
        public supplyPointsOverviewContainerFacade: SupplyPointsOverviewContainerFacade,
        public utilsService: UtilsService
    ) {
        super();
    }

    public changeActiveContractType(contractTypes: ContractTypes) {
        this.navigateConsumerService.navigateToSupplyPoints(contractTypes);
    }

    public createSupplyPoint = (event) => {
        event.stopPropagation();
        this.navigateConsumerService.navigateToRequestStepByProgressStatus(
            ProgressStatus.SIGNBOARD
        );
    };

    public trackSupplyPoint(index, { id }) {
        return id;
    }

    public navigateToSupplyPointDetail({
        contract: { contractId },
        id,
    }: ISupplyPoint) {
        this.navigateConsumerService.navigateToSupplyPointDetail(
            id,
            contractId
        );
    }
}
