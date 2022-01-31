import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { ROUTES } from 'src/app/app.constants';
import { NavigateRequestService } from 'src/app/services/navigate-request.service';
import { AbstractFacade } from 'src/common/abstract.facade';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ContractTypes } from './supply-points-overview-container.model';

@Injectable()
export class SupplyPointsOverviewContainerFacade extends AbstractFacade {
    public activeContractTypes = ContractTypes.FUTURE;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected supplyPointService: SupplyService,
        private navigateRequestService: NavigateRequestService
    ) {
        super();
    }

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

    public readonly redirectDetailFromHistory = (contractId) => {
        this.supplyPointService
            .getByContractId(contractId)
            .pipe(
                take(1),
                map(({ data }) => data.findSupplyPointByContractId)
            )
            .subscribe((suppyPoint: ISupplyPoint) => {
                this.router.navigate([
                    ROUTES.ROUTER_SUPPLY_POINTS +
                        '/' +
                        suppyPoint.id +
                        '/' +
                        contractId,
                ]);
            });
    };
}
