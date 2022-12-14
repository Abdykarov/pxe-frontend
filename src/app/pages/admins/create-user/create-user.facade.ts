import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CONSTS, ROUTES } from 'src/app/app.constants';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';
import { IMicroTableData } from 'src/common/ui/micro-table/micro-table/item.model';
import { mapGlobalGraphQLErrorMessages } from 'src/common/utils';
import { IQueryParams } from './models/create-user.model';

@Injectable({
    providedIn: 'root',
})
export class CreateUserFacade {
    public readonly queryParamsSubject$: BehaviorSubject<IQueryParams> =
        new BehaviorSubject({});
    public readonly queryParams$ = this.queryParamsSubject$.asObservable();

    public activeSupplyPoint$: Observable<ISupplyPoint>;

    public supplyPointsImport$: Observable<ISupplyPoint[]> = null;
    public supplyPointsImportMicroTableData$: Observable<IMicroTableData[]> =
        null;

    constructor(
        private modalsService: ModalService,
        private router: Router,
        private supplyPointImportService: SupplyPointImportService
    ) {
        this.activeSupplyPoint$ = this.getCreateUser$.pipe(
            map(R.prop('activeSupplyPoint'))
        );

        this.modalsService.closeModalData$
            .pipe(
                filter(
                    R.allPass([
                        R_.isNotNil,
                        R.propEq(
                            'modalType',
                            CONSTS.MODAL_TYPE.CONFIRM_DELETE_SUPPLY_POINT_IMPORT
                        ),
                    ])
                )
            )
            .subscribe((modal) => {
                if (modal.confirmed) {
                    this.deleteSupplyPointImport(
                        modal.data.id,
                        this.getAskForOfferId()
                    );
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    public getCreateUser$ = this.supplyPointImportService
        .getCreateUser()
        .pipe(map(({ data }) => data.createUser));

    public setObservableByQueryParams$ = (
        askForOfferId: string,
        supplyPointId: string,
        email: string,
        isNewSupplyPoint: boolean
    ) => {
        this.queryParamsSubject$.next({
            askForOfferId,
            supplyPointId,
            email,
        });

        this.supplyPointsImport$ = this.supplyPointImportService
            .findSupplyPointImports(askForOfferId)
            .pipe(
                map(({ data }) => data.findSupplyPointImports),
                tap((supplyPoints: ISupplyPoint[]) => {
                    const supplyPointCount = supplyPoints.length;
                    if (supplyPointId !== null) {
                        const activeSupplyPoint: ISupplyPoint = R.find(
                            R.propEq('id', supplyPointId)
                        )(supplyPoints);
                        this.setActiveSupplyPoint(activeSupplyPoint);
                    } else if (!isNewSupplyPoint && supplyPointCount > 0) {
                        this.router.navigate(
                            [ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT],
                            {
                                queryParams: {
                                    askForOfferId:
                                        this.queryParamsSubject$.getValue()
                                            .askForOfferId,
                                    supplyPointId: R.last(supplyPoints).id,
                                    email: this.getEmail(),
                                },
                            }
                        );
                    } else {
                        this.setActiveSupplyPoint(null);
                    }
                    return supplyPoints;
                })
            );

        this.supplyPointsImportMicroTableData$ = this.supplyPointsImport$.pipe(
            map(
                R.map(
                    (supplyPoint: ISupplyPoint): IMicroTableData => ({
                        data: supplyPoint,
                        label: supplyPoint.name || '',
                        active: supplyPoint.id === this.getSupplyPointId(),
                        description: supplyPoint.identificationNumber,
                    })
                )
            )
        );

        return [
            this.supplyPointsImport$,
            this.supplyPointsImportMicroTableData$,
        ];
    };

    public deleteSupplyPointImport = (
        supplyPointImportId: string,
        askForOfferId: string
    ) =>
        this.supplyPointImportService
            .deleteSupplyPointImportMutation(supplyPointImportId, askForOfferId)
            .subscribe((_) => {
                const deletingSupplyPointIdIsActive =
                    supplyPointImportId === this.getSupplyPointId();
                if (deletingSupplyPointIdIsActive) {
                    const supplyPointsImport =
                        this.supplyPointImportService.getSupplyPointImports(
                            askForOfferId
                        );
                    this.router.navigate(
                        [ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT],
                        {
                            queryParams: {
                                askForOfferId:
                                    this.queryParamsSubject$.getValue()
                                        .askForOfferId,
                                email: this.getEmail(),
                            },
                            state: {
                                isNewSupplyPoint:
                                    supplyPointsImport.length === 0,
                            },
                        }
                    );
                }
            });

    public confirmDeleteSupplyPointImport = (
        supplyPoint: ISupplyPoint
    ): void => {
        this.modalsService.showModal$.next({
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_DELETE_SUPPLY_POINT_IMPORT,
            instanceData: {
                confirmText: `Opravdu chcete smazat odb??rn?? m??sto
                                <strong>${
                                    supplyPoint.name ||
                                    (supplyPoint.commodityType ===
                                    CommodityType.POWER
                                        ? 'ODB??RN?? M??STO - ELEKT??INA'
                                        : 'ODB??RN?? M??STO - PLYN')
                                }</strong>?`,
                titleConfirm: 'ANO SMAZAT',
                data: supplyPoint,
            },
        });
    };

    public showInfoAboutSupplyPointAdded = (): void => {
        this.modalsService.showModal$.next({
            component: 'ConfirmModalComponent',
            modalType: CONSTS.MODAL_TYPE.CONFIRM_INFO_SUPPLY_POINT_IMPORT_ADDED,
            instanceData: {
                confirmText: `Faktura byla ulo??ena. Najdete ji v sekci rozpracovan??.`,
                titleConfirm: 'OK',
                showClose: false,
                showCloseButton: false,
            },
            withoutScroll: true,
        });
    };

    public setActiveSupplyPoint = (supplyPoint: ISupplyPoint) =>
        this.supplyPointImportService
            .setActiveSupplyPoint(supplyPoint)
            .subscribe();

    public processEanFieldErrorToGlobal = (
        fieldError: IFieldError
    ): string[] => {
        const eanFieldError = fieldError['ean'];
        if (eanFieldError) {
            const key = Object.keys(fieldError['ean'])[0];
            return mapGlobalGraphQLErrorMessages([key]);
        } else {
            return null;
        }
    };

    public getEmail = (): string => this.queryParamsSubject$.getValue().email;
    public getAskForOfferId = (): string =>
        this.queryParamsSubject$.getValue().askForOfferId;
    public getSupplyPointId = (): string =>
        this.queryParamsSubject$.getValue().supplyPointId;
}
