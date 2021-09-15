import { Injectable } from '@angular/core';

import {
    filter,
    map,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AbstractFacade } from 'src/common/abstract.facade';
import { concludedSupplyPointsToHistory } from 'src/common/containers/history/overview-container/overview-container.utils';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { IHistory } from 'src/common/containers/history/models/history';
import { isDataAvailable } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Injectable({
    providedIn: 'root',
})
export class OverviewContainerFacade extends AbstractFacade {
    public historySupplyPoints$ = this.supplyService.findSupplyPointsByContractStatus(
        [ContractStatus.CONCLUDED],
    ).pipe(this.catchError);

    public historySupplyPointsData$: Observable<IHistory> = this.historySupplyPoints$
        .pipe(
            filter(isDataAvailable),
            map(({data}) => data.findSupplyPointsByContractStatus),
            map(concludedSupplyPointsToHistory(new Date().getFullYear())),
        );

    constructor(
        private supplyService: SupplyService,
    ) {
        super();
    }

    isLoading$: Observable<boolean> = this.createIsLoading(this.historySupplyPoints$);
}
