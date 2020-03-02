import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import { Observable } from 'apollo-client/util/Observable';
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
                const { findSupplierOffers: offers } = cache.readQuery({ query: findSupplierOffersQuery });
                const createdOffer: IOffer = data.savePowerOffer;
                createdOffer.marked = false;
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: [
                            ...offers,
                            createdOffer,
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
                const { findSupplierOffers: offers } = cache.readQuery({ query: findSupplierOffersQuery });
                const createdOffer: IOffer = data.saveGasOffer;
                createdOffer.marked = false;
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: [
                            ...offers,
                            createdOffer,
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
                const { findSupplierOffers: offers } = cache.readQuery({ query: findSupplierOffersQuery });
                const updatedData = R.map(offer => {
                    if (offer.id === data.deleteOffer.toString()) {
                        offer.status = IOfferStatus.DELETED;
                    }
                    return offer;
                })(offers);
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: updatedData,
                    },
                });
            },
        })


    public markAll = (mark: boolean, commodityType: CommodityType): number => {
        const client = this.apollo.getClient();
        const { findSupplierOffers: offers } = client.readQuery({ query: findSupplierOffersQuery });
        let numberOfMarked = 0;
        const markedOffers = R.map((offer: IOffer) => {
            if (offer.commodityType === commodityType && offer.status === IOfferStatus.ACTIVE) {
                numberOfMarked++;
                offer.marked = mark;
            }
            return offer;
        }, offers);
        client.writeQuery({
            query: findSupplierOffersQuery,
            data: {
                findSupplierOffers: markedOffers,
            },
        });
        return mark ? numberOfMarked : 0;
    }

    public markOne = (id: number, commodityType: CommodityType): number => {
        let numberOfMarked = 0;
        const client = this.apollo.getClient();
        const { findSupplierOffers: offers } = client.readQuery({ query: findSupplierOffersQuery });
        const updatedOffers = R.map((offer: IOffer) => {
            if (offer.id === id) {
                offer.marked = !offer.marked;
            }
            if (offer.marked && offer.commodityType === commodityType && offer.status === IOfferStatus.ACTIVE) {
                numberOfMarked++;
            }
            return offer;
        }, offers);
        client.writeQuery({
            query: findSupplierOffersQuery,
            data: {
                findSupplierOffers: updatedOffers,
            },
        });
        return numberOfMarked;
    }

    public deleteMarkedOffer = (commodityType: CommodityType): Observable<any>[] => {
        const client = this.apollo.getClient();
        const { findSupplierOffers: offers } = client.readQuery({ query: findSupplierOffersQuery });
        const offerObservableForDelete = [];
        R.map((offer: IOffer) => {
            if (offer.marked && offer.status === IOfferStatus.ACTIVE && commodityType === offer.commodityType) {
                offerObservableForDelete.push(
                    this.deleteOffer(offer.id)
                        .pipe(
                            catchError((err) => of({isError: true, error: err})),
                        ),
                );
            }
        }, offers);
        return offerObservableForDelete;
    }
}
