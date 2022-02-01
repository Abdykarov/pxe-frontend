import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { map, share, switchMap, take } from 'rxjs/operators';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { AbstractFacade } from 'src/common/abstract.facade';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import {
    ISupplyPoint,
    ProgressStatus,
} from '../../graphql/models/supply.model';
import { ContractTypes } from './supply-points-overview-container.model';

@Injectable()
export class SupplyPointsOverviewContainerFacade extends AbstractFacade {
    public activeContractTypes = null;
    public date = new Date();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected supplyPointService: SupplyService,
        private navigateRequestService: NavigateRequestService
    ) {
        super();
    }

    private readonly supplyPointsSource$ = this.route.params.pipe(
        switchMap(({ type }) => {
            this.activeContractTypes = type;
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

    public readonly redirectToNewVersionOfSupplyPoint = (contractId) => {
        this.supplyPointService
            .getByContractId(contractId)
            .pipe(
                take(1),
                map(({ data }) => data.findSupplyPointByContractId)
            )
            .subscribe((suppyPoint: ISupplyPoint) =>
                this.navigateRequestService.checkCorrectStep(
                    suppyPoint,
                    ProgressStatus.COMPLETED
                )
            );
    };
}
