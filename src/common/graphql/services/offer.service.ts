import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

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
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes,
    IOfferStatus,
} from 'src/common/graphql/models/offer.model';
import { IOfferImportInput } from 'src/app/pages/import/import.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OfferService {

    constructor(
        private apollo: Apollo,
        private http: HttpClient,
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

    public batchImport = (offers: IOfferImportInput[]) => this.http.post<any>(
        `${environment.url_api}/v1.0/offer/batch-import`,
        [offers[0].offerInput],
    )
}
