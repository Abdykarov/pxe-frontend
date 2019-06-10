import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import {
    deleteOffer,
    saveGasOffer,
    savePowerOffer,
    updatePowerOffer,
} from 'src/common/graphql/mutation/offer';
import {
    findSupplierOffers,
    findSupplyPointOffers,
} from 'src/common/graphql/queries/offer';
import {
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes,
    IOfferStatus,
} from 'src/common/graphql/models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class OfferService {

    constructor(
        private apollo: Apollo,
    ) {}

    public findSupplierOffers() {
        return this.apollo
            .watchQuery<any>({
                query: findSupplierOffers,
                // errorPolicy: 'ignore',
            })
            .valueChanges;
    }

    public updateGasOffer(offerId: number, offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) {
        return this.apollo
            .mutate({
                mutation: gasAttributes,
                variables: {
                    offerId,
                    offer,
                    gasAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffers,
                }],
            });
    }
}
