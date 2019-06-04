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

    public findSupplyPointOffers(ean: string) {
        return this.apollo
            .query({
                query: findSupplyPointOffers,
                variables: {
                    ean,
                },
            });
    }

    public savePowerOffer(offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: savePowerOffer,
                variables: {
                    offer,
                    powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffers,
                }],
            });
    }

    public saveGasOffer(offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) {
        return this.apollo
            .mutate({
                mutation: saveGasOffer,
                variables: {
                    offer,
                    gasAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffers,
                }],
            });
    }

    public updatePowerOffer(offerId: number, offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: updatePowerOffer,
                variables: {
                    offerId,
                    offer,
                    powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffers,
                }],
            });
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

    public deleteOffer(offerId: number) {
        return this.apollo
            .mutate({
                mutation: deleteOffer,
                variables: {
                    offerId,
                },
                update: (cache, {data}) => {
                    const offers: any = cache.readQuery({ query: findSupplierOffers });
                    const updatedData = R.map(offer => {
                        if (offer.id === data.deleteOffer.toString()) {
                            offer.status = IOfferStatus.DELETED;
                        }
                        return offer;
                    })(offers.findSupplierOffers);
                    cache.writeQuery({
                        query: findSupplierOffers,
                        data: { findSupplierOffers: updatedData},
                    });
                },
                refetchQueries: [{
                    query: findSupplierOffers,
                }],
            });
    }

}
