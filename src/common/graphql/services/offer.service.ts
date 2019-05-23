import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    deleteOffer,
    saveGasOffer,
    savePowerOffer,
    updatePowerOffer,
} from '../mutation/offer';
import { findOffers } from '../queries/offer';
import {
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes,
} from '../models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class OfferService {

    constructor(
        private apollo: Apollo,
    ) {}

    public findOffers() {
        return this.apollo
            .watchQuery<any>({
                query: findOffers,
            })
            .valueChanges;
    }

    public savePowerOffer(offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: savePowerOffer,
                variables: {
                    offer: offer,
                    powerAttributes: powerAttributes,
                },
            });
    }

    public saveGasOffer(offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) {
        return this.apollo
            .mutate({
                mutation: saveGasOffer,
                variables: {
                    offer: offer,
                    gasAttributes: gasAttributes,
                },
            });
    }

    public updatePowerOffer(offerId: number, offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) {
        return this.apollo
            .mutate({
                mutation: updatePowerOffer,
                variables: {
                    offerId: offerId,
                    offer: offer,
                    powerAttributes: powerAttributes,
                },
            });
    }

    public updateGasOffer(offerId: number, offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) {
        return this.apollo
            .mutate({
                mutation: gasAttributes,
                variables: {
                    offerId: offerId,
                    offer: offer,
                    gasAttributes: gasAttributes,
                },
            });
    }

    public deleteOffer(offerId: number) {
        return this.apollo
            .mutate({
                mutation: deleteOffer,
                variables: {
                    offerId: offerId,
                },
            });
    }

}
