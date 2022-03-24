import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';
import { AbstractFacade } from 'src/common/abstract.facade';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ContractTypes } from './supply-points-overview-container.model';

@Injectable()
export class SupplyPointsOverviewContainerFacade extends AbstractFacade {
    public activeContractTypes = ContractTypes.FUTURE;

    constructor(
        private route: ActivatedRoute,
        protected supplyPointService: SupplyService
    ) {
        super();
    }

    private readonly supplyPointsSource$ = this.route.params.pipe(
        switchMap(({ type }) => {
            this.activeContractTypes = type;
            this.globalErrorSubject$.next([]);
            return this.getSupplyPoints(type);
        }),
        share()
    );

    public getSupplyPoints = (contractType: ContractTypes) =>
        this.supplyPointService
            .findSupplyPointsConcludedByContractType(
                (<string>contractType).toUpperCase()
            )
            .pipe(this.catchError);

    public readonly supplyPoints$: Observable<ISupplyPoint[]> =
        this.supplyPointsSource$.pipe(
            map(({ data = null }) => {
                return data?.findSupplyPointsConcludedByContractType;
            })
        );

    public readonly isLoading$: Observable<any> = this.supplyPointsSource$.pipe(
        map(R.prop('loading'))
    );

    public readonly supplyPointStatistic$: Observable<any> =
        this.supplyPointService
            .computeAndGetSupplyPointStatistics()
            .pipe(map(({ data }) => data.computeAndGetSupplyPointStatistics));
}
