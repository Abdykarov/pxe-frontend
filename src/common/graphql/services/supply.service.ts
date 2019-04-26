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
import { toggleOverlay } from '../mutation/overlay';
import { saveElectricitySupplyPoint } from '../mutation/supply';

@Injectable({
    providedIn: 'root',
})
export class SupplyService {

    constructor(private apollo: Apollo) { }

    public getSuppliers(commodityType: CommodityType) {
        return this.apollo
            .watchQuery<any>({
                query: findAllSuppliers,
                variables: {
                    commodityType: commodityType === CommodityType.ELECTRICITY ? 'ELECTRICITY' : 'GAS',
                },
            })
            .valueChanges;
    }

    public getCodelistByType(type: String, locale: String) {
        return this.apollo
            .watchQuery<any>({
                query: getCodelistByType,
                variables: {
                    type: type,
                    locale: locale,
                },
            })
            .valueChanges;
    }

    public findCodelistsByTypes(type: String, locale: String) {
        return this.apollo
            .watchQuery<any>({
                query: findCodelistsByTypes,
                variables: {
                    types: type,
                    locale: locale,
                },
            })
            .valueChanges;
    }

    public findSupplierDocumentsByComodity(supplierId: number, commodityType: CommodityType) {
        return this.apollo
            .watchQuery<any>({
                query: findSupplierDocumentsByComodity,
                variables: {
                    supplierId: supplierId,
                    commodityType: commodityType === CommodityType.ELECTRICITY ? 'ELECTRICITY' : 'GAS',
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
