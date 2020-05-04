import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import {
    AllowedOperations,
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import {
    concludeContractMutation,
    confirmFirstContractViewMutation,
    deleteContractMutation,
    deleteSelectedOfferFromContractMutation,
    deleteSignedContractMutation,
    saveContractMutation,
    sendContractConfirmationSmsMutation,
    signContractMutation,
    unsetContractProlongationMutation,
    updateContractMutation,
} from 'src/common/graphql/mutation/contract';
import {
    ContractDeleteReason,
    IQRCodeSetting,
} from 'src/common/graphql/models/contract';
import { DEFAULT_QR_CODE_SETTING } from 'src/app/app.constants';
import {
    getContractTermsQuery,
    getPaymentInfoQuery,
} from 'src/common/graphql/queries/contract';
import { IOffer } from 'src/common/graphql/models/offer.model';
import { findSupplyPointOffersQuery } from 'src/common/graphql/queries/offer';
import { getSupplyPointQuery } from 'src/common/graphql/queries/supply';

@Injectable({
    providedIn: 'root',
})
export class ContractService {

    constructor(
        private apollo: Apollo,
    ) {}

    public saveContract = (offerId: string, supplyPointId: string) => this.apollo
        .mutate<any>({
            mutation: saveContractMutation,
            variables: {
                offerId,
                supplyPointId,
            },
            // update: (cache, { data }) => {
            //     const { getSupplyPoint } = cache.readQuery(
            //         {
            //             query: getSupplyPointQuery,
            //             variables: {
            //                 supplyPointId: supplyPointId,
            //             },
            //         });
            //
            //     this.loadSupplyPointDetail(offerId, getSupplyPoint, cache, data);
            //
            //     cache.writeQuery({
            //         query: getSupplyPointQuery,
            //         data: { getSupplyPoint },
            //         variables: {
            //             supplyPointId: supplyPointId,
            //         },
            //     });
            // },
        })

    public getContractTerms = (contractId: string) => this.apollo
        .watchQuery<any>({
            query: getContractTermsQuery,
            variables: {
                contractId,
            },
        })
        .valueChanges

    public signContract = (contractId: string, smsCode: string) => this.apollo
        .mutate<any>({
            mutation: signContractMutation,
            variables: {
                contractId,
                smsCode,
            },
        })

    public sendContractConfirmationSms = (contractId: string) => this.apollo
        .mutate<any>({
            mutation: sendContractConfirmationSmsMutation,
            variables: {
                contractId,
            },
        })

    public updateContract = (contractId: number) => this.apollo
        .mutate<any>({
            mutation: updateContractMutation,
            variables: {
                contractId,
            },
        })

    public deleteContract = (contractId: string) => this.apollo
        .mutate<any>({
            mutation: deleteContractMutation,
            variables: {
                contractId,
            },
        })

    public concludeContract = (contractId: number) => this.apollo
        .mutate<any>({
            mutation: concludeContractMutation,
            variables: {
                contractId,
            },
        })

    // docasny reseni pred sync s BE
    public loadSupplyPointDetail = (offerId: string, supplyPoint: ISupplyPoint, cache, data) => {
        const { findSupplyPointOffers } = cache.readQuery(
            {
                query: findSupplyPointOffersQuery,
                variables: {
                    ean: supplyPoint.ean,
                },
            });

        const supplyPointOffer: IOffer = R.find(R.propEq('id', offerId))(findSupplyPointOffers);

        supplyPoint.progressStatus = ProgressStatus.PERSONAL_DATA;
        supplyPoint.contract = {
            contractId: data.saveContract,
            contractStatus: 'NOT_CONCLUDED',
            deliveryFrom: '',
            deliveryTo: '',
            offerValidity: true,
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
                accountingRegulatedPrice: supplyPointOffer.accountingRegulatedPrice,
                consumptionPriceNT: supplyPointOffer.consumptionPriceNT,
                consumptionPriceVT: supplyPointOffer.consumptionPriceVT,
                priceVTWithVAT: supplyPointOffer.priceVTWithVAT,
                priceNTWithVAT: supplyPointOffer.priceNTWithVAT,
                priceGasWithVAT: supplyPointOffer.priceGasWithVAT,
                distributionPriceByCapacity: supplyPointOffer.distributionPriceByCapacity,
                distributionPriceByConsumptionNT: supplyPointOffer.distributionPriceByConsumptionNT,
                distributionPriceByConsumptionVT: supplyPointOffer.distributionPriceByConsumptionVT,
                energyTaxRegulatedPrice: supplyPointOffer.energyTaxRegulatedPrice,
                marketOrganizerRegulatedPrice: supplyPointOffer.marketOrganizerRegulatedPrice,
                monthlyConsumptionFee: supplyPointOffer.monthlyConsumptionFee,
                renewableEnergyRegulatedPrice: supplyPointOffer.renewableEnergyRegulatedPrice,
                systemServicesRegulatedPrice: supplyPointOffer.systemServicesRegulatedPrice,
                status: supplyPointOffer.status,
                permanentPaymentPrice: supplyPointOffer.permanentPaymentPrice,
                subject: supplyPointOffer.subject,
                totalPrice: supplyPointOffer.totalPrice,
                unit: supplyPointOffer.unit,
                prepayment: null,
                greenEnergy: supplyPointOffer.greenEnergy,
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

    public deleteSignedContract = (
        contractId: string,
        smsConfirmationCode: string,
        contractDeleteReason: ContractDeleteReason,
    ) => this.apollo
        .mutate<any>({
            mutation: deleteSignedContractMutation,
            variables: {
                contractId,
                smsConfirmationCode,
                contractDeleteReason,
            },
        })

    public deleteSelectedOfferFromContract = (contractId: string) => this.apollo
        .mutate<any>({
            mutation: deleteSelectedOfferFromContractMutation,
            variables: {
                contractId,
            },
        })

    public getPaymentInfo = (contractId: string, setting: IQRCodeSetting = DEFAULT_QR_CODE_SETTING) => this.apollo
        .watchQuery<any>({
            query: getPaymentInfoQuery,
            variables: {
                contractId,
                setting,
            },
        })
        .valueChanges

    public confirmFirstContractView = () => this.apollo
        .mutate<any>({
            mutation: confirmFirstContractViewMutation,
        })

    public unsetContractProlongation = (supplyPointId: string, contractId: string, smsCode: string) => this.apollo
        .mutate<any>({
            mutation: unsetContractProlongationMutation,
            variables: {
                contractId,
                smsCode,
            },
            update: (cache, { data }) => {
                const { getSupplyPoint } = cache.readQuery(
                    {
                        query: getSupplyPointQuery,
                        variables: {
                            supplyPointId,
                        },
                    });

                getSupplyPoint.contract.prolong = false;

                getSupplyPoint.allowedOperations = getSupplyPoint.allowedOperations.filter(
                    (allowedOperation: AllowedOperations) => allowedOperation !== AllowedOperations.UNSET_AUTOMATIC_PROLONGATION,
                );

                cache.writeQuery({
                    query: getSupplyPointQuery,
                    data: { getSupplyPoint },
                    variables: {
                        supplyPointId,
                    },
                });
            },
        })
}
