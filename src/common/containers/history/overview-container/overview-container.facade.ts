import { Injectable } from '@angular/core';

import {
    filter,
    map,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { concludedSupplyPointsToHistory } from 'src/common/containers/history/overview-container/overview-container.utils';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { HistoryFacade } from 'src/common/containers/history/history.facade';
import { IHistory } from 'src/common/containers/history/models/history';
import { isDataAvailable } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Injectable()
export class OverviewContainerFacade extends HistoryFacade {
    public readonly historySupplyPoints$ = this.supplyService.findSupplyPointsByContractStatus(
        [ContractStatus.CONCLUDED],
        null,
        false,
        true,
    ).pipe(this.catchError);

    public readonly historySupplyPointsData$: Observable<IHistory> = this.historySupplyPoints$
        .pipe(
            filter(isDataAvailable),
            map(({data}) => data.findSupplyPointsByContractStatus),
            map(concludedSupplyPointsToHistory(new Date().getTime())),
        );

    public readonly isLoading$: Observable<boolean> = this.createIsLoading(this.historySupplyPoints$);

    constructor(
        private supplyService: SupplyService,
    ) {
        super();
    }
}
