import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from '../models/supply.model';
import {
    getCodelistByType,
    getSupplyPoint,
    findAllSuppliers,
    findCodelistsByTypes,
    findSupplierDocumentsByComodity,
    findSupplyPoints,
} from 'src/common/graphql/queries/supply';
import {
    saveGasSupplyPoint,
    savePowerSupplyPoint,
    updateGasSupplyPointWithContract,
    updatePowerSupplyPointWithContract,
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
                query: findAllSuppliers,
                variables: {
                    commodityType,
                },
            })
            .valueChanges;
    }

    public getCodelistByType(type: string, locale: string) {
        return this.apollo
            .watchQuery<any>({
                query: getCodelistByType,
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
                query: findCodelistsByTypes,
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
                query: findSupplierDocumentsByComodity,
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
                query: findSupplyPoints,
                variables: {
                    ean,
                },
            })
            .valueChanges;
    }

    public savePowerSupplyPoint(supplyPoint: ISupplyPoint, powerAttributes: ISupplyPointPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: savePowerSupplyPoint,
                variables: {
                    supplyPoint: supplyPoint,
                    powerAttributes: powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPoints,
                    variables: {
                        ean: null,
                    },
                }],
            });
    }

    public saveGasSupplyPoint(supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointGasAttributes) {
        return this.apollo
            .mutate({
                mutation: saveGasSupplyPoint,
                variables: {
                    supplyPoint: supplyPoint,
                    gasAttributes: gasAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPoints,
                    variables: {
                        ean: null,
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
                mutation: updatePowerSupplyPointWithContract,
                variables: {
                    supplyPointId,
                    supplyPoint,
                    powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPoints,
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
                mutation: updateGasSupplyPointWithContract,
                variables: {
                    supplyPointId,
                    supplyPoint,
                    gasAttributes,
                },
                refetchQueries: [{
                    query: findSupplyPoints,
                    variables: {
                        ean: null,
                    },
                }],
            });
    }

    public getSupplyPoint(supplyPointId: number) {
        return this.apollo
            .watchQuery<any>({
                query: getSupplyPoint,
            variables: {
                supplyPointId,
            },
        })
        .valueChanges;
    }
}
