import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    IContractsBasedOnOffersFilter,
    IPaginationFilter,
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
            paginationFilter: IPaginationFilter,
        ) => this.apollo
                .watchQuery<any>({
                    query: listSupplierContractsBasedOnOffersQuery,
                    variables: {
                        contractsBasedOnOffersFilter,
                        paginationFilter,
                    },
                })
                .valueChanges

}
