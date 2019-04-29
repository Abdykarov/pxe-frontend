import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    CommodityType,
    ISupplyPoint,
} from '../models/supply.model';
import {
    getCodelistByType,
    findAllSuppliers,
    findCodelistsByTypes,
    findSupplierDocumentsByComodity,
} from 'src/common/graphql/queries/supply';
import { saveElectricitySupplyPoint } from '../mutation/supply';

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

    public saveElectricitySupplyPoint(supplyPoint: ISupplyPoint) {
        return this.apollo
            .mutate({
                mutation: saveElectricitySupplyPoint,
                variables: {
                    supplyPoint: supplyPoint,
                },
            });
    }
}
