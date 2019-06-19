import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    concludeContract,
    deleteContract,
    saveContract,
    updateContract,
} from 'src/common/graphql/mutation/contract';
import { getSupplyPoint } from '../queries/supply';

@Injectable({
    providedIn: 'root',
})
export class ContractService {

    constructor(
        private apollo: Apollo,
    ) {}

    public saveContract(offerId: number, supplyPointId: number) {
        return this.apollo
            .mutate({
                mutation: saveContract,
                variables: {
                    offerId,
                    supplyPointId,
                },
                update: (cache, {data}) => {
                    const supplyPoints: any = cache.readQuery(
                        {
                            query: getSupplyPoint,
                            variables: {
                                supplyPointId,
                            },
                    });
                    console.log('UPRAVUJU');
                    console.log(supplyPoints);
                    console.log(data);
                    console.log(offerId);
                    console.log(supplyPoints);
                    console.log('UPRAVUJU');

                    // const updatedData = R.map(offer => {
                    //     if (offer.id === data.deleteOffer.toString()) {
                    //         offer.status = IOfferStatus.DELETED;
                    //     }
                    //     return offer;
                    // })(offers.findSupplierOffers);
                    // cache.writeQuery({
                    //     query: findSupplierOffers,
                    //     data: { findSupplierOffers: updatedData},
                    // });
                },
            });
    }

    public updateContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: updateContract,
                variables: {
                    contractId,
                },
            });
    }

    public deleteContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: deleteContract,
                variables: {
                    contractId,
                },
            });
    }

    public concludeContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: concludeContract,
                variables: {
                    contractId,
                },
            });
    }
}
