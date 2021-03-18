import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    createSupplyPointImportMutation,
    setActiveAskForOfferIdMutation,
} from 'src/common/graphql/mutation/supply-point-import';
import { findSupplyPointImportsQuery, getActiveAskForOfferIdQuery } from 'src/common/graphql/queries/supply-point-import';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointImportService {

    constructor(
        private apollo: Apollo,
    ) {}

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

    public getActiveAskForOfferIdQuery = () => this.apollo
        .watchQuery<any>({
                query: getActiveAskForOfferIdQuery,
            },
        ).valueChanges

    public setActiveAskForOfferId = (askForOfferId: string) => this.apollo
        .mutate<any>({
                mutation: setActiveAskForOfferIdMutation,
                variables: {
                    askForOfferId,
                },
            },
        )

    public findSupplyPointImports = (
        askForOfferId: string,
    ) => this.apollo
        .query<any>({
                query: findSupplyPointImportsQuery,
                variables: {
                    askForOfferId,
                },
                fetchPolicy: 'network-only',
            },
        )

    public mapSupplyPointToSupplyPointInput = (supplyPoint: ISupplyPoint): ISupplyPointImportInput =>  {
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
        supplyPoint = JSON.parse(JSON.stringify(supplyPoint), omitTypename);
        const personalData = supplyPoint.contract?.personalData;
        return {
            address: supplyPoint.address,
            expirationDate: supplyPoint.expirationDate,
            name: supplyPoint.name,
            timeToContractEnd: supplyPoint.timeToContractEnd,
            timeToContractEndPeriodId: supplyPoint.timeToContractEndPeriod?.code,
            contractEndTypeId: supplyPoint.contractEndType?.code,
            subjectTypeId: supplyPoint.subject?.code,
            supplierId: supplyPoint.supplier?.id,
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
            ...(!!supplyPoint.identificationNumber && supplyPoint.commodityType === CommodityType.POWER) && {
                supplyPointPowerAttributes: {
                    ean: supplyPoint.identificationNumber,
                    circuitBreakerId: supplyPoint.circuitBreaker?.code,
                    phasesId: supplyPoint.phases?.code,
                    distributionRateId: supplyPoint.distributionRate?.code,
                    annualConsumptionNT: supplyPoint.annualConsumptionNT,
                    annualConsumptionVT: supplyPoint.annualConsumptionVT,
                },
            },
            ...(!!supplyPoint.identificationNumber && supplyPoint.commodityType === CommodityType.GAS) && {
                supplyPointGasAttributes: {
                    eic: supplyPoint.identificationNumber,
                    annualConsumption: supplyPoint.annualConsumption,
                },
            },
        };
    }



}
