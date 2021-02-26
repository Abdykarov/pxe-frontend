import {
    HttpClient,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    catchError,
    map,
} from 'rxjs/operators';
import { Observable } from 'apollo-client/lib/util/Observable';
import {
    Observable as ObservableRxjs,
    of,
} from 'rxjs';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    deleteOfferMutation,
    saveGasOfferMutation,
    savePowerOfferMutation,
    updateGasOfferMutation,
    updatePowerOfferMutation,
} from 'src/common/graphql/mutation/offer';
import { environment } from 'src/environments/environment';
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
import { IResponseDataDocument } from 'src/app/services/model/document.model';

@Injectable({
    providedIn: 'root',
})
export class OfferService {

    constructor(
        private apollo: Apollo,
        private http: HttpClient,
    ) {}

    private setIsLastUpdatedToFalse = (offers: IOffer[]): IOffer[] => R.map(R.assoc('isLastUpdated', false))(offers);

    public findSupplierOffers = () => this.apollo
        .watchQuery<any>({
            query: findSupplierOffersQuery,
            fetchPolicy: 'network-only',
        })
        .valueChanges

    public findSupplyPointOffers = (identificationNumber: string) => this.apollo
        .watchQuery<any>({
            fetchPolicy: 'network-only',
            query: findSupplyPointOffersQuery,
            variables: {
                identificationNumber,
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
                const offersWithLastUpdatedFalse = this.setIsLastUpdatedToFalse(offers);
                const createdOffer: IOffer = data.savePowerOffer;
                createdOffer.marked = false;
                createdOffer.isLastUpdated = true;
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: [
                            ...offersWithLastUpdatedFalse,
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
                const offersWithLastUpdatedFalse = this.setIsLastUpdatedToFalse(offers);
                const createdOffer: IOffer = data.saveGasOffer;
                createdOffer.marked = false;
                createdOffer.isLastUpdated = true;
                cache.writeQuery({
                    query: findSupplierOffersQuery,
                    data: {
                        findSupplierOffers: [
                            ...offersWithLastUpdatedFalse,
                            createdOffer,
                        ],
                    },
                });
            },
        })

    private checkAndUpdateApolloClientInUpdateOffers = (offerId, data, cache) => {
        const operationOffers = data.updatePowerOffer ? data.updatePowerOffer : data.updateGasOffer;
        const offerIdString = String(offerId);
        const newOfferId = operationOffers.id;
        const anySignedOffer = newOfferId !== offerIdString;

        const { findSupplierOffers: offers } = cache.readQuery({ query: findSupplierOffersQuery });
        const offersWithLastUpdatedFalse = this.setIsLastUpdatedToFalse(offers);

        const newFindSupplierOffers = R.map((mappingOffer: IOffer) => {
            if (anySignedOffer && offerIdString === mappingOffer.id) {
                mappingOffer = {
                    ...operationOffers,
                    id: newOfferId,
                    marked: false,
                    isLastUpdated: true,
                };
            }
            if (!anySignedOffer && offerIdString === mappingOffer.id) {
                mappingOffer = {
                    ...operationOffers,
                    marked: false,
                    isLastUpdated: true,
                };
            }
            return mappingOffer;
        })(offersWithLastUpdatedFalse);

        cache.writeQuery({
            query: findSupplierOffersQuery,
            data: {
                findSupplierOffers: [
                    ...newFindSupplierOffers,
                ],
            },
        });
    }

    public updatePowerOffer = (offerId: string, offer: IOfferInput, powerAttributes: IOfferInputPowerAttributes) => this.apollo
        .mutate<any>({
            mutation: updatePowerOfferMutation,
            variables: {
                offerId,
                offer,
                powerAttributes,
            },
            update: (cache, {data}) => {
                this.checkAndUpdateApolloClientInUpdateOffers(offerId, data, cache);
            },
        })

    public updateGasOffer = (offerId: string, offer: IOfferInput, gasAttributes: IOfferInputGasAttributes) => this.apollo
        .mutate<any>({
            mutation: updateGasOfferMutation,
            variables: {
                offerId,
                offer,
                gasAttributes,
            },
            update: (cache, {data}) => {
                this.checkAndUpdateApolloClientInUpdateOffers(offerId, data, cache);
            },
        })

    public deleteOffer = (offerId: string) => this.apollo
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

    public batchImport = (offers: IOfferInput[]) => this.http.post<any>(
        `${environment.url_api}/v1.0/offer/batch-import`,
        offers,
    )

    public exportCSV = (): ObservableRxjs<IResponseDataDocument> => {
        return this.http.get(`${environment.url_api}/v1.0/offer/export-csv`, {
            responseType: 'blob',
            observe: 'response',
        }).pipe(
            map((response: HttpResponse<any>): IResponseDataDocument => {
                const headers = response.headers.get('content-disposition');
                const filename = headers.split(';')[1].split('filename')[1]
                    .split('=')[1].trim().replace(new RegExp('"', 'g'), '');

                return {
                    file: response.body,
                    filename,
                };
            }),
        );
    }

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

    public markOne = (id: string, commodityType: CommodityType): number => {
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
