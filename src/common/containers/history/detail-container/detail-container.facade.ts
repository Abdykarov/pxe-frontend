import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HistoryFacade } from 'src/common/containers/history/history.facade';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { isDataAvailable } from 'src/common/utils';

@Injectable()
export class DetailContainerFacade extends HistoryFacade {
    public readonly historySupplyPoint$ = this.supplyPointService
        .getSupplyPoint(this.supplyPointId, this.contractId, true)
        .pipe(this.catchError);

    public readonly historySupplyPointData$: Observable<ISupplyPoint> =
        this.historySupplyPoint$.pipe(
            filter(isDataAvailable),
            map(({ data }) => data.getSupplyPoint)
        );

    public readonly isLoading$: Observable<boolean> = this.createIsLoading(
        this.historySupplyPoint$
    );

    constructor(
        protected supplyPointId: string,
        protected contractId: string,
        protected supplyPointService: SupplyService
    ) {
        super();
    }
}
