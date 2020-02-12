import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { CommodityType } from 'src/common/graphql/models/supply.model';

import {
    deleteOfferMutation,
    saveGasOfferMutation,
    savePowerOfferMutation,
    updateGasOfferMutation,
    updatePowerOfferMutation,
} from 'src/common/graphql/mutation/offer';
import {
    findSupplierOffersQuery,
    findSupplyPointOffersQuery,
} from 'src/common/graphql/queries/offer';
import {
    IOffer,
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

    public findSupplierOffers = () => this.apollo
        .watchQuery<any>({
            query: findSupplierOffersQuery,
        })
        .valueChanges

    public findSupplyPointOffers = (ean: string) => this.apollo
        .watchQuery<any>({
            fetchPolicy: 'network-only',
            query: findSupplyPointOffersQuery,
            variables: {
                ean,
            },
        })
        .valueChanges

    public savePowerOffer = (offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) => this.apollo
        .mutate<any>({
            mutation: savePowerOfferMutation,
            variables: {
                offer,
                powerAttributes,
            },
            update: (cache, {data}) => {
                const offers: any = cache.readQuery({ query: findSupplierOffersQuery });
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: [
                            ...offers.findSupplierOffers,
                            data.savePowerOffer,
                        ],
                    },
                });
            },
        })

    public saveGasOffer = (offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) => this.apollo
        .mutate<any>({
            mutation: saveGasOfferMutation,
            variables: {
                offer,
                gasAttributes,
            },
            update: (cache, {data}) => {
                const offers: any = cache.readQuery({ query: findSupplierOffersQuery });
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: [
                            ...offers.findSupplierOffers,
                            data.saveGasOffer,
                        ],
                    },
                });
            },
        })

    public updatePowerOffer = (offerId: number, offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) => this.apollo
        .mutate<any>({
            mutation: updatePowerOfferMutation,
            variables: {
                offerId,
                offer,
                powerAttributes,
            },
        })

    public updateGasOffer = (offerId: number, offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) => this.apollo
        .mutate<any>({
            mutation: updateGasOfferMutation,
            variables: {
                offerId,
                offer,
                gasAttributes,
            },
        })

    public deleteOffer = (offerId: number) => this.apollo
        .mutate<any>({
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
                    data: {
                        findSupplierOffers: updatedData,
                    },
                });
            },
        })


    public markAll = (mark: boolean) => {
        const client = this.apollo.getClient();
        const offers: any = client.readQuery({ query: findSupplierOffersQuery });
        const markedOffers = R.map((offer: IOffer) => {
            offer.marked = mark;
            return offer;
        }, offers.findSupplierOffers);
        client.writeQuery({
            query: findSupplierOffersQuery,
            data: {
                findSupplierOffers: markedOffers,
            },
        });
        return markedOffers.length;
    }

    public markOne = (id: number) => {
        let numberOfMarked = 0;
        const client = this.apollo.getClient();
        const offers: any = client.readQuery({ query: findSupplierOffersQuery });
        const updatedOffers = R.map((offer: IOffer) => {
            if (offer.id === id) {
                offer.marked = !offer.marked;
            }
            if (offer.marked) {
                numberOfMarked++;
            }
            return offer;
        }, offers.findSupplierOffers);
        client.writeQuery({
            query: findSupplierOffersQuery,
            data: {
                findSupplierOffers: updatedOffers,
            },
        });
        return numberOfMarked;
    }

    public deleteMarkedOffer = (commodityType: CommodityType) => {
        const client = this.apollo.getClient();
        const offers: any = client.readQuery({ query: findSupplierOffersQuery });
        const offerObservableForDelete = [];
        R.map((offer: IOffer) => {
            if (offer.marked && offer.status === IOfferStatus.ACTIVE && commodityType === offer.commodityType) {
                offerObservableForDelete.push(this.deleteOffer(offer.id));
            }
        }, offers.findSupplierOffers);
        return offerObservableForDelete;
    }
}
