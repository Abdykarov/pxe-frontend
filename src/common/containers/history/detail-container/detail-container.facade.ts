import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
    filter,
    map,
} from 'rxjs/operators';

import { AbstractFacade } from 'src/common/abstract.facade';
import { isDataAvailable } from 'src/common/utils';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Injectable()
export class DetailContainerFacade extends AbstractFacade {
    public historySupplyPoint$ = this.supplyPointService.getSupplyPoint(
        this.supplyPointId,
        this.contractId,
        true,
    );

    public historySupplyPointData$: Observable<ISupplyPoint> = this.historySupplyPoint$
        .pipe(
            filter(isDataAvailable),
            map(({data}) => data.getSupplyPoint),
        );

    constructor(
        protected supplyPointId: string,
        protected contractId: string,
        protected supplyPointService: SupplyService,
    ) {
        super();
        console.log('__INIT__');
        console.log(supplyPointId);
        console.log(contractId);
    }

    isLoading$: Observable<boolean> = this.createIsLoading(this.historySupplyPoint$);
}
