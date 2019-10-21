import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    IContractsBasedOnOffersFilter,
} from 'src/common/graphql/models/suppplier.model';
import { listSupplierContractsBasedOnOffersQuery } from 'src/common/graphql/queries/supplier';


@Injectable({
    providedIn: 'root',
})
export class SupplierService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getListSupplierContractsBasedOnOffers = (
        contractsBasedOnOffersFilter: IContractsBasedOnOffersFilter,
    ) => this.apollo
        .watchQuery<any>({
            query: listSupplierContractsBasedOnOffersQuery,
            variables: {
                filter: {
                    ...contractsBasedOnOffersFilter,
                },
            },
            fetchPolicy: 'network-only',
        })
        .valueChanges

}
