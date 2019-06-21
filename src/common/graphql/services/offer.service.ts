import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import {
    deleteOfferMutation,
    saveGasOfferMutation,
    savePowerOfferMutation,
    updatePowerOfferMutation,
} from 'src/common/graphql/mutation/offer';
import {
    findSupplierOffersQuery,
    findSupplyPointOffersQuery,
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
                query: findSupplierOffersQuery,
                // errorPolicy: 'ignore',
            })
            .valueChanges;
    }

    public findSupplyPointOffers(ean: string) {
        return this.apollo
            .watchQuery<any>({
                query: findSupplyPointOffersQuery,
                variables: {
                    ean,
                },
            })
            .valueChanges;
    }

    public savePowerOffer(offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: savePowerOfferMutation,
                variables: {
                    offer,
                    powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffersQuery,
                }],
            });
    }

    public saveGasOffer(offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) {
        return this.apollo
            .mutate({
                mutation: saveGasOfferMutation,
                variables: {
                    offer,
                    gasAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffersQuery,
                }],
            });
    }

    public updatePowerOffer(offerId: number, offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: updatePowerOfferMutation,
                variables: {
                    offerId,
                    offer,
                    powerAttributes,
                },
                refetchQueries: [{
                    query: findSupplierOffersQuery,
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
                    query: findSupplierOffersQuery,
                }],
            });
    }

    public deleteOffer(offerId: number) {
        return this.apollo
            .mutate({
                mutation: deleteOfferMutation,
                variables: {
                    offerId,
                },
                update: (cache, {data}) => {
                    const offers: any = cache.readQuery({ query: findSupplierOffersQuery });
                    const updatedData = R.map(offer => {
                        if (offer.id === data.deleteOffer.toString()) {
                            offer.status = IOfferStatus.DELETED;
                        }
                        return offer;
                    })(offers.findSupplierOffers);
                    cache.writeQuery({
                        query: findSupplierOffersQuery,
                        data: { findSupplierOffers: updatedData},
                    });
                },
            });
    }

}
