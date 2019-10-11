import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { listSupplierContractsBasedOnOffersQuery } from 'src/common/graphql/queries/supplier';


@Injectable({
    providedIn: 'root',
})
export class SupplierService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getListSupplierContractsBasedOnOffers = () => this.apollo
        .watchQuery<any>({
            query: listSupplierContractsBasedOnOffersQuery,
        })
        .valueChanges

}
