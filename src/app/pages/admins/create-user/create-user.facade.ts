import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    filter,
    map,
    tap,
} from 'rxjs/operators';
import {
    BehaviorSubject,
    Observable,
} from 'rxjs';

import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { IMicroTableData } from 'src/common/ui/micro-table/micro-table/item.model';
import { IQueryParams } from './models/create-user.model';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
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
        private modalsService: ModalService,
        private router: Router,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        this.activeSupplyPoint$ = this.getCreateUser$.pipe(map(R.prop('activeSupplyPoint')));

        this.modalsService.closeModalData$
            .pipe(
                filter(
                    R.allPass([
                        R_.isNotNil,
                        R.propEq('modalType', CONSTS.MODAL_TYPE.CONFIRM_DELETE_SUPPLY_POINT_IMPORT),
                    ]),
                ),
            )
            .subscribe(modal => {
                if (modal.confirmed) {
                    if (this.getSupplyPointId() === modal.data.id) {
                        this.router.navigate([ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT], {
                            queryParams: {
                                askForOfferId: this.queryParamsSubject$.getValue().askForOfferId,
                            },
                        });
                    }

                    this.deleteSupplyPointImport(modal.data.id, this.getAskForOfferId());
                }
                this.modalsService.closeModalData$.next(null);
            });
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
                            this.setActiveSupplyPoint(activeSupplyPoint);
                        } else {
                            this.setActiveSupplyPoint(null);
                        }
                        return supplyPoints;
                    },
                ),
            );

        this.supplyPointsImportMicroTableData$ = this.supplyPointsImport$.pipe(
            map(
                R.map(
                    (supplyPoint: ISupplyPoint) =>
                        (
                            {
                                data: supplyPoint,
                                label: supplyPoint.name || (supplyPoint.commodityType === CommodityType.POWER ?
                                    'ODBÉRNÉ MÍSTO - ELEKTŘINA' : 'ODBÉRNÉ MÍSTO - PLYN'),
                                active: supplyPoint.id === this.getSupplyPointId(),
                            }
                        ),
                ),
            ),
        );

        return [this.supplyPointsImport$, this.supplyPointsImportMicroTableData$];
    }

    public deleteSupplyPointImport = (supplyPointImportId: string, askForOfferId: string) =>
        this.supplyPointImportService.deleteSupplyPointImportMutation(supplyPointImportId, askForOfferId).subscribe()

    public confirmDeleteSupplyPointImport = (supplyPoint: ISupplyPoint): void => {
        this.modalsService
            .showModal$.next({
                component: 'ConfirmModalComponent',
                modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_SUPPLY_POINT_IMPORT,
                instanceData: {
                    confirmText: `Opravdu chcete smazat odběrné místo
                                <strong>${supplyPoint.name ||
                                            (supplyPoint.commodityType === CommodityType.POWER ?
                                                'ODBÉRNÉ MÍSTO - ELEKTŘINA' : 'ODBÉRNÉ MÍSTO - PLYN')}</strong>?`,
                    titleConfirm: 'ANO SMAZAT',
                    data: supplyPoint,
                },
            });
    }

    public showInfoAboutSupplyPointAdded = (): void => {
        this.modalsService
            .showModal$.next({
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_INFO_SUPPLY_POINT_IMPORT_ADDED,
            instanceData: {
                confirmText:
                    `Faktura byla uložena. Najdete ji v sekci rozpracované.`,
                titleConfirm: 'OK',
                showClose: false,
                showCloseButton: false,
            },
            withoutScroll: true,
        });
    }

    public setActiveSupplyPoint = (supplyPoint: ISupplyPoint) =>
        this.supplyPointImportService.setActiveSupplyPoint(supplyPoint).subscribe()

    public getAskForOfferId = (): string => this.queryParamsSubject$.getValue().askForOfferId;
    public getSupplyPointId = (): string => this.queryParamsSubject$.getValue().supplyPointId;
}
