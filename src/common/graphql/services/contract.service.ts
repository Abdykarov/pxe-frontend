import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    findSupplierOffers,
    findSupplyPointOffers,
} from 'src/common/graphql/queries/offer';
import {
    IOfferInput,
    IOfferInputGasAttributes,
} from 'src/common/graphql/models/offer.model';
import { getContractTerms } from '../queries/contract';

@Injectable({
    providedIn: 'root',
})
export class OfferService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getContractTerms(contractId: number) {
        return this.apollo
            .watchQuery<any>({
                query: getContractTerms,
                variables: {
                    contractId,
                },
            })
            .valueChanges;
    }

    public signContract(contractId: number, smsCode: string) {
        return this.apollo
            .mutate({
                mutation: signContract,
                variables: {
                    contractId,
                    smsCode,
                },
            });
    }
}
