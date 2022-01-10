import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from 'src/app/app.constants';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { orderKeyValueByKeyDest } from 'src/common/utils';
import { OverviewContainerFacade } from './overview-container.facade';

@Component({
    selector: 'pxe-history-overview-container',
    templateUrl: './overview-container.component.html',
    styleUrls: ['./overview-container.component.scss'],
    providers: [OverviewContainerFacade],
})
export class OverviewContainerComponent {
    public readonly orderKeyValueByKeyDest = orderKeyValueByKeyDest;

    public readonly restoreContractAction =
        this.overviewContainerFacade.restoreContractAction;
    public readonly history$ =
        this.overviewContainerFacade.historySupplyPointsData$;
    public readonly isLoading$ = this.overviewContainerFacade.isLoading$;
    public readonly fieldError$ = this.overviewContainerFacade.fieldError$;
    public readonly globalError$ = this.overviewContainerFacade.globalError$;

    constructor(
        public overviewContainerFacade: OverviewContainerFacade,
        private route: ActivatedRoute,
        public router: Router
    ) {}

    public navigateToHistoryDetail({
        contract: { contractId },
        id,
    }: ISupplyPoint): void {
        this.router.navigate([id, contractId], {
            relativeTo: this.route,
        });
    }

    public createSupplyPoint(event): void {
        event.preventDefault();
        this.router.navigate([ROUTES.ROUTER_REQUEST_SIGNBOARD]);
    }
}
