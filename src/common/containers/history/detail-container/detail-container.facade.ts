import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
    filter,
    map,
    tap,
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
    ).pipe(this.catchError);

    public historySupplyPointData$: Observable<ISupplyPoint> = this.historySupplyPoint$
        .pipe(
            tap(
                aa => {
                    console.log('___tap___');
                    console.log(aa);
                },
            ),
            filter(isDataAvailable),
            map(({data}) => data.getSupplyPoint),
        );

    constructor(
        protected supplyPointId: string,
        protected contractId: string,
        protected supplyPointService: SupplyService,
    ) {
        super();
    }

    isLoading$: Observable<boolean> = this.createIsLoading(this.historySupplyPoint$);
}
