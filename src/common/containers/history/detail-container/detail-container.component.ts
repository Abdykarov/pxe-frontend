import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DetailContainerFacade } from './detail-container.facade';
import { DetailContainerFacadeProvider } from './detail-container.provider';
import { ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'pxe-history-detail-container',
    templateUrl: './detail-container.component.html',
    styleUrls: ['./detail-container.component.scss'],
    providers: [DetailContainerFacadeProvider],
})
export class DetailContainerComponent {
    public readonly restoreContractAction = this.detailContainerFacade.restoreContractAction;
    public readonly supplyPoint$ = this.detailContainerFacade.historySupplyPointData$;
    public readonly isLoading$ = this.detailContainerFacade.isLoading$;
    public readonly fieldError$ = this.detailContainerFacade.fieldError$;
    public readonly globalError$ = this.detailContainerFacade.globalError$;

    constructor(
        public detailContainerFacade: DetailContainerFacade,
        public router: Router,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    public backStep(): void {
        this.router.navigate([ROUTES.ROUTER_HISTORY]);
    }
}
