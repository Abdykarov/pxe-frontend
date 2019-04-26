import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { CommodityType } from '../models/supply.model';
import {
    getCodelistByType,
    findAllSuppliers,
    findCodelistsByTypes,
    findSupplierDocumentsByComodity,
} from 'src/common/graphql/queries/supplier';

@Injectable({
    providedIn: 'root',
})
export class SupplierService {

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
}
