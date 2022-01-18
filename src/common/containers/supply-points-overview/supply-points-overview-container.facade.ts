import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AbstractFacade } from 'src/common/abstract.facade';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ISupplyPoint } from '../../graphql/models/supply.model';
import { ContractTypes } from './supply-points-overview-container.model';

@Injectable()
export class SupplyPointsOverviewContainerFacade extends AbstractFacade {
    public activeContractTypes = null;

    public getSupplyPoints = (contractType: ContractTypes) =>
        this.supplyPointService
            .findSupplyPointsConcludedByContractType(
                (<string>contractType).toUpperCase()
            )
            .pipe(this.catchError);

    private readonly supplyPointsSource$ = this.route.params.pipe(
        switchMap(({ type }) => {
            this.activeContractTypes = type;
            return this.getSupplyPoints(type);
        })
    );

    public readonly supplyPoints$: Observable<ISupplyPoint[]> =
        this.supplyPointsSource$.pipe(
            map(
                ({ data = null }) =>
                    data?.findSupplyPointsConcludedByContractType
            )
        );

    public readonly isLoading$: Observable<boolean> = this.createIsLoading(
        this.supplyPointsSource$
    );

    constructor(
        private route: ActivatedRoute,
        protected supplyPointService: SupplyService
    ) {
        super();
    }
}
