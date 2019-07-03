import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import {
    concludeContractMutation,
    deleteContractMutation,
    deleteSignedContract,
    saveContractMutation,
    updateContractMutation,
} from 'src/common/graphql/mutation/contract';
import { getContractTermsQuery } from 'src/common/graphql/queries/contract';
import { getSupplyPointQuery } from 'src/common/graphql/queries/supply';
import { findSupplyPointOffersQuery } from 'src/common/graphql/queries/offer';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { ISupplyPointOffer } from 'src/common/graphql/models/offer.model';
import {
    sendContractConfirmationSmsMutation,
    signContractMutation,
} from 'src/common/graphql/mutation/contract';

@Injectable({
    providedIn: 'root',
})
export class ContractService {

    constructor(
        private apollo: Apollo,
    ) {}

    public saveContract(offerId: number, supplyPointId: string) {
        return this.apollo
            .mutate({
                mutation: saveContractMutation,
                variables: {
                    offerId,
                    supplyPointId,
                },
                update: (cache, { data }) => {
                    const { getSupplyPoint } = cache.readQuery(
                        {
                            query: getSupplyPointQuery,
                            variables: {
                                supplyPointId: supplyPointId,
                            },
                        });

                    this.loadSupplyPointDetail(offerId, getSupplyPoint, cache, data);

                    cache.writeQuery({
                        query: getSupplyPointQuery,
                        data: { getSupplyPoint },
                        variables: {
                            supplyPointId: supplyPointId,
                        },
                    });
                },
            });
    }

    public getContractTerms(contractId: string) {
        return this.apollo
            .watchQuery<any>({
                query: getContractTermsQuery,
                variables: {
                    contractId,
                },
            })
            .valueChanges;
    }

    public signContract(contractId: string, smsCode: string) {
        return this.apollo
            .mutate({
                mutation: signContractMutation,
                variables: {
                    contractId,
                    smsCode,
                },
            });
    }

    public sendContractConfirmationSms(contractId: string) {
        return this.apollo
            .mutate({
                mutation: sendContractConfirmationSmsMutation,
                variables: {
                    contractId,
                },
            });
    }

    public updateContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: updateContractMutation,
                variables: {
                    contractId,
                },
            });
    }

    public deleteContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: deleteContractMutation,
                variables: {
                    contractId,
                },
            });
    }

    public concludeContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: concludeContractMutation,
                variables: {
                    contractId,
                },
            });
    }

    // docasny reseni pred sync s BE
    public loadSupplyPointDetail = (offerId: number, supplyPoint: ISupplyPoint, cache, data) => {
        const { findSupplyPointOffers } = cache.readQuery(
            {
                query: findSupplyPointOffersQuery,
                variables: {
                    ean: supplyPoint.ean,
                },
            });

        const supplyPointOffer: ISupplyPointOffer = R.find(R.propEq('id', offerId))(findSupplyPointOffers);

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
            personalData: null,
            // personalData: {
            //     name: '',
            //     ico: '',
            //     dic: '',
            //     address1: {
            //         street: '',
            //         orientationNumber: '',
            //         descriptiveNumber: '',
            //         city: '',
            //         postCode: '',
            //         region: '',
            //         __typename: 'address1',
            //     },
            //     address2: {
            //         street: '',
            //         orientationNumber: '',
            //         descriptiveNumber: '',
            //         city: '',
            //         postCode: '',
            //         region: '',
            //         __typename: 'address2',
            //     },
            //     email: '',
            //     phone: '',
            //     bankAccountNumber: '',
            //     bankCode: '',
            //     depositPaymentType: {
            //         type: '',
            //         code: '',
            //         description: '',
            //         help: '',
            //         __typename: 'depositPaymentType',
            //     },
            //     deposit: null,
            //     __typename: 'personalData',
            // },
            __typename: 'contract',
        };
    }

    public deleteSignedContract(contractId: number, smsConfirmationCode: string) {
        return this.apollo
            .mutate({
                mutation: deleteSignedContract,
                variables: {
                    contractId,
                    smsConfirmationCode,
                },
            });
    }
    // todo cache v tudle chvili se zalozi nova verze SP popripade se mu jen zrus kontract\
}
