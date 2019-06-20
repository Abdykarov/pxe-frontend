import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    concludeContract,
    deleteContract,
    saveContract,
    updateContract,
} from 'src/common/graphql/mutation/contract';
import { getSupplyPoint } from 'src/common/graphql/queries/supply';
import { findSupplyPointOffers } from 'src/common/graphql/queries/offer';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class ContractService {

    constructor(
        private apollo: Apollo,
    ) {
    }

    public saveContract(offerId: number, supplyPointId: number) {
        return this.apollo
            .mutate({
                mutation: saveContract,
                variables: {
                    offerId,
                    supplyPointId,
                },
                update: (cache, { data }) => {
                    const getSupplyPointResult: {
                        getSupplyPoint: ISupplyPoint
                    } = cache.readQuery(
                        {
                            query: getSupplyPoint,
                            variables: {
                                supplyPointId: supplyPointId,
                            },
                        });

                    const supplyPoint: ISupplyPoint = getSupplyPointResult.getSupplyPoint;
                    this.loadSupplyPointDetail(offerId, supplyPoint, cache, data);

                    cache.writeQuery({
                        query: getSupplyPoint,
                        data: { getSupplyPoint: supplyPoint },
                        variables: {
                            supplyPointId: supplyPointId,
                        },
                    });
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

    // docasny reseni pred sync s BE
    public loadSupplyPointDetail = (offerId: number, supplyPoint: ISupplyPoint, cache, data) => {
        const findSupplyPointOffersResponse: {
            findSupplyPointOffers: ISupplyPointOffer[]
        } = cache.readQuery(
            {
                query: findSupplyPointOffers,
                variables: {
                    ean: supplyPoint.ean,
                },
            });

        const supplyPointOffers: ISupplyPointOffer[] = findSupplyPointOffersResponse.findSupplyPointOffers;
        const supplyPointOffer: ISupplyPointOffer = supplyPointOffers.find((spOffer: ISupplyPointOffer) => {
            return spOffer.id === offerId;
        });

        supplyPoint.contract = {
            contractId: data.saveContract,
            contractStatus: 'CONCLUDED',
            deliveryFrom: '',
            deliveryTo: '',
            offer: {
                id: offerId,
                supplier: supplyPointOffer.supplier,
                commodityType: supplyPointOffer.commodityType,
                name: supplyPointOffer.name,
                validFrom: supplyPointOffer.validFrom,
                validTo: supplyPointOffer.validTo,
                deliveryFrom: supplyPointOffer.deliveryFrom,
                deliveryTo: '',
                deliveryLength: supplyPointOffer.deliveryLength,
                benefits: supplyPointOffer.benefits,
                priceVT: supplyPointOffer.priceVT,
                priceNT: supplyPointOffer.priceNT,
                priceGas: supplyPointOffer.priceGas,
                mountlyPaymentPrice: supplyPointOffer.permanentPaymentPrice,
                __typename: 'offer',
            },
            personalData: {
                name: '',
                ico: '',
                dic: '',
                address1: {
                    street: '',
                    orientationNumber: '',
                    descriptiveNumber: '',
                    city: '',
                    postCode: '',
                    region: '',
                    __typename: 'address1',
                },
                address2: {
                    street: '',
                    orientationNumber: '',
                    descriptiveNumber: '',
                    city: '',
                    postCode: '',
                    region: '',
                    __typename: 'address2',
                },
                email: '',
                phone: '',
                bankAccountNumber: '',
                bankCode: '',
                depositPaymentType: {
                    type: '',
                    code: '',
                    description: '',
                    help: '',
                    __typename: 'depositPaymentType',
                },
                deposit: null,
                __typename: 'personalData',
            },
            __typename: 'contract',
        };
    }
}
