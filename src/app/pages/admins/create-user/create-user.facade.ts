import { Injectable } from '@angular/core';

import * as R from 'ramda';
import {
    map,
    tap,
} from 'rxjs/operators';
import {
    BehaviorSubject,
    Observable,
} from 'rxjs';

import { IMicroTableData } from 'src/common/ui/micro-table/micro-table/item.model';
import { IQueryParams } from './models/create-user.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';

@Injectable({
    providedIn: 'root',
})
export class CreateUserFacade {
    public readonly queryParamsSubject$: BehaviorSubject<IQueryParams> = new BehaviorSubject({});
    public readonly queryParams$ = this.queryParamsSubject$.asObservable();

    public activeSupplyPoint$: Observable<ISupplyPoint>;

    public supplyPointsImport$: Observable<ISupplyPoint[]> = null;
    public supplyPointsImportMicroTableData$: Observable<IMicroTableData[]> = null;

    constructor(
        private supplyPointImportService: SupplyPointImportService,
    ) {
        this.activeSupplyPoint$ = this.getCreateUser$.pipe(map(R.prop('activeSupplyPoint')));
    }

    public getCreateUser$ = this.supplyPointImportService.getCreateUser()
        .pipe(
            map(({data}) => data.createUser),
        );

    public setObservableByQueryParams$ = (askForOfferId: string, supplyPointId: string) => {
        this.queryParamsSubject$.next({
            askForOfferId,
            supplyPointId,
        });

        this.supplyPointsImport$ = this.supplyPointImportService.findSupplyPointImports(askForOfferId)
            .pipe(
                map(({data}) => data.findSupplyPointImports),
                tap(
                    (supplyPoints: ISupplyPoint[]) => {
                        if (supplyPointId !== null) {
                            const activeSupplyPoint: ISupplyPoint = R.find(
                                R.propEq('id', supplyPointId),
                            )(supplyPoints);
                            this.supplyPointImportService.setActiveSupplyPoint(activeSupplyPoint).subscribe();
                        } else {
                            this.supplyPointImportService.setActiveSupplyPoint(null).subscribe();
                        }
                        return supplyPoints;
                    },
                ),
            );

        this.supplyPointsImportMicroTableData$ = this.supplyPointsImport$.pipe(
            map(
                R.map((supplyPoint: ISupplyPoint) => ({id: supplyPoint.id, label: supplyPoint.name || supplyPoint.identificationNumber })),
            ),
        );

        return [this.supplyPointsImport$, this.supplyPointsImportMicroTableData$];
    }

    public deleteSupplyPointImport = (supplyPointImportId: string, askForOfferId: string) =>
        this.supplyPointImportService.deleteSupplyPointImportMutation(supplyPointImportId, askForOfferId).subscribe()

    public getAskForOfferId = (): string => this.queryParamsSubject$.getValue().askForOfferId;
    public getSupplyPointId = (): string => this.queryParamsSubject$.getValue().supplyPointId;
}
