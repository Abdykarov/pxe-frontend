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
    findAllSuppliers,
    findCodelistsByTypes,
    findSupplierDocumentsByComodity,
} from 'src/common/graphql/queries/supply';
import {
    saveElectricitySupplyPoint,
    saveGasSupplyPoint,
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

    public saveElectricitySupplyPoint(supplyPoint: ISupplyPoint, powerAttributes: ISupplyPointPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: saveElectricitySupplyPoint,
                variables: {
                    supplyPoint: supplyPoint,
                    powerAttributes: powerAttributes,
                },
            });
    }

    public saveGasSupplyPoint(supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointGasAttributes) {
        console.log(supplyPoint);
        console.log(gasAttributes);
        return this.apollo
            .mutate({
                mutation: saveGasSupplyPoint,
                variables: {
                    supplyPoint: supplyPoint,
                    gasAttributes: gasAttributes,
                },
            });
    }
}
