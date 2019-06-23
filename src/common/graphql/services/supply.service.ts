import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from '../models/supply.model';
import {
    getCodelistByTypeQuery,
    getSupplyPointQuery,
    findAllSuppliersQuery,
    findCodelistsByTypesQuery,
    findSupplierDocumentsByComodityQuery,
    findSupplyPointsQuery,
} from 'src/common/graphql/queries/supply';
import {
    saveGasSupplyPointMutation,
    savePowerSupplyPointMutation,
    updateGasSupplyPointWithContractMutation,
    updatePowerSupplyPointWithContractMutation,
} from '../mutation/supply';

@Injectable({
    providedIn: 'root',
})
export class SupplyService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getSuppliers(commodityType: CommodityType) {
        return this.apollo
            .watchQuery<any>({
                query: findAllSuppliersQuery,
                variables: {
                    commodityType,
                },
            })
            .valueChanges;
    }

    public getCodelistByType(type: string, locale: string) {
        return this.apollo
            .watchQuery<any>({
                query: getCodelistByTypeQuery,
                variables: {
                    type,
                    locale,
                },
            })
            .valueChanges;
    }

    public findCodelistsByTypes(types: string[], locale: string) {
        return this.apollo
            .watchQuery<any>({
                query: findCodelistsByTypesQuery,
                variables: {
                    types,
                    locale,
                },
            })
            .valueChanges;
    }

    public findSupplierDocumentsByComodity(supplierId: number, commodityType: CommodityType) {
        return this.apollo
            .watchQuery<any>({
                query: findSupplierDocumentsByComodityQuery,
                variables: {
                    supplierId,
                    commodityType,
                },
            })
            .valueChanges;
    }

    public findSupplyPoints(ean: string = null) {
        return this.apollo
            .watchQuery<any>({
                query: findSupplyPointsQuery,
                variables: {
                    ean,
                },
            })
            .valueChanges;
    }

    public savePowerSupplyPoint(supplyPoint: ISupplyPoint, powerAttributes: ISupplyPointPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: savePowerSupplyPointMutation,
                variables: {
                    supplyPoint: supplyPoint,
                    powerAttributes: powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPointsQuery,
                    variables: {
                        ean: powerAttributes.ean,
                    },
                }],
            });
    }

    public saveGasSupplyPoint(supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointGasAttributes) {
        return this.apollo
            .mutate({
                mutation: saveGasSupplyPointMutation,
                variables: {
                    supplyPoint: supplyPoint,
                    gasAttributes: gasAttributes,
                },
                refetchQueries:  [{
                    query: findSupplyPointsQuery,
                    variables: {
                        ean: gasAttributes.eic,
                    },
                }],
            });
    }

    public updatePowerSupplyPointWithContract(
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        powerAttributes: ISupplyPointPowerAttributes,
    ) {
        return this.apollo
            .mutate({
                mutation: updatePowerSupplyPointWithContractMutation,
                variables: {
                    supplyPointId,
                    supplyPoint,
                    powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPointsQuery,
                    variables: {
                        ean: null,
                    },
                }],
            });
    }

    public updateGasSupplyPointWithContract(
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        gasAttributes: ISupplyPointGasAttributes,
    ) {
        return this.apollo
            .mutate({
                mutation: updateGasSupplyPointWithContractMutation,
                variables: {
                    supplyPointId,
                    supplyPoint,
                    gasAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPointsQuery,
                    variables: {
                        ean: null,
                    },
                }],
            });
    }

    public getSupplyPoint(supplyPointId: string) {
        return this.apollo
            .watchQuery<any>({
                query: getSupplyPointQuery,
                variables: {
                    supplyPointId,
                },
            })
            .valueChanges;
    }
}
