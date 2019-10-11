import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { listSupplierContractsBasedOnOffersQuery } from 'src/common/graphql/queries/supplier';
import { CommodityType } from 'src/common/graphql/models/supply.model';


@Injectable({
    providedIn: 'root',
})
export class SupplierService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getListSupplierContractsBasedOnOffers = (
            commodityType: CommodityType,
            numberOfPage: number,
            itemsPerPage: number,
        ) => this.apollo
                .watchQuery<any>({
                    query: listSupplierContractsBasedOnOffersQuery,
                })
                .valueChanges

}
