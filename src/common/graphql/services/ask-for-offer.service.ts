import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import {
    ContractUploadStatus,
    IAskForOfferFilter,
    ISupplyPointGasAttributesImport, ISupplyPointImport,
    ISupplyPointImportInput,
    ISupplyPointPowerAttributesImport,
} from 'src/common/graphql/models/ask-for-offer';
import {findSupplyPointImportQuery, listAskForOfferQuery} from 'src/common/graphql/queries/ask-for-offer';
import { IResponseDataDocument} from 'src/app/services/model/document.model';
import {saveAs} from 'file-saver';
import {
    createSupplyPointImportMutation,
    deleteAskForOfferMutation, finalizeAskForOfferMutation,
} from 'src/common/graphql/mutation/ask-for-offer';
import {ISupplyPoint} from '../models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class AskForOfferService {

    constructor(
        private apollo: Apollo,
    ) {}

    public listAskForOffer = (
        askForOfferFilter: IAskForOfferFilter,
    ) => this.apollo
        .watchQuery<any>({
            query: listAskForOfferQuery,
            variables: {
                filter: askForOfferFilter,
            },
            fetchPolicy: 'network-only',
        })
        .valueChanges

    public documentSave = (data: IResponseDataDocument) => saveAs(data.file, data.filename);

    public createSupplyPointImport = (
        askForOfferId: string,
        supplyPoint: any,
    ) => this.apollo
        .mutate<any>({
                mutation: createSupplyPointImportMutation,
                variables: {
                    askForOfferId,
                    supplyPoint,
                },
            },
        )

    public deleteAskForOffer = (
        askForOfferId: string,
        paginator,
    ) => this.apollo.mutate<any>({
            mutation: deleteAskForOfferMutation,
            variables: {
                askForOfferId,
            },
            refetchQueries: [
                {
                    query: listAskForOfferQuery,
                    variables: {
                        filter: paginator,
                    },
                },
            ],
        },
    )

    public findSupplyPointImport = (
        askForOfferId: string,
    ) => this.apollo
        .query<any>({
                query: findSupplyPointImportQuery,
                variables: {
                    askForOfferId,
                },
            },
        )

    public finalizeAskForOffer = (askForOfferId: string) => this.apollo.mutate<any>({
        mutation: finalizeAskForOfferMutation,
        variables: {
            askForOfferId,
        },
    })

    public mapSupplyPointToSupplyPointInput = (supplyPoint: ISupplyPoint): ISupplyPointImportInput =>  {
        const personalData = supplyPoint.contract?.personalData;
        return {
            address: supplyPoint.address,
            expirationDate: supplyPoint.expirationDate,
            name: supplyPoint.name,
            timeToContractEnd: supplyPoint.timeToContractEnd,
            timeToContractEndPeriodId: supplyPoint.timeToContractEndPeriod?.code,
            contractEndTypeId: supplyPoint.contractEndType?.code,
            subjectTypeId: supplyPoint.subject.code,
            supplierId: supplyPoint.supplier.id,
            ...(!!personalData) && {
                personalData: {
                    email: personalData.email,
                    address1: personalData.address1,
                    address2: personalData.address2,
                    bankAccountNumber: personalData.bankAccountNumber,
                    bankCode: personalData.bankCode,
                    deposit: personalData.deposit,
                    birthDate: personalData.birthDate,
                    depositPaymentTypeId: personalData.depositPaymentType?.code,
                    dic: personalData.dic,
                    ico: personalData.ico,
                    name: personalData.name,
                    phone: personalData.phone,
                    signatoryName: personalData.signatoryName,
                    signatoryPosition: personalData.signatoryPosition,
                    signatorySurname: personalData.signatorySurname,
                },
            },
            ...(!!supplyPoint.circuitBreaker) && {
                supplyPointPowerAttributes: {
                    ean: supplyPoint.identificationNumber,
                    circuitBreakerId: supplyPoint.circuitBreaker?.code,
                    phasesId: supplyPoint.phases?.code,
                    distributionRateId: supplyPoint.distributionRate?.code,
                    annualConsumptionNT: supplyPoint.annualConsumptionNT,
                    annualConsumptionVT: supplyPoint.annualConsumptionVT,
                },
            },
            ...(!!supplyPoint.annualConsumption) && {
                supplyPointGasAttributes: {
                    eic: supplyPoint.identificationNumber,
                    annualConsumption: supplyPoint.annualConsumption,
                },
            },
        };
    }
}
