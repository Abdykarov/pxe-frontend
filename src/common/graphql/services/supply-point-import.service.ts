import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';

import {
    createSupplyPointImportMutation,
    deleteSupplyPointImportMutation,
    setActiveSupplyPointMutation,
} from 'src/common/graphql/mutation/supply-point-import';
import {
    findSupplyPointImportsQuery,
    getCreateUserQuery,
} from 'src/common/graphql/queries/supply-point-import';
import {
    CommodityType,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';
import {
    IPersonalData,
    IPersonalDataInput,
} from 'src/common/graphql/models/personal-data.model';
import { omitTypeName } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class SupplyPointImportService {

    constructor(
        private apollo: Apollo,
    ) {}

    public createSupplyPointImport = (
        askForOfferId: string,
        supplyPoint: ISupplyPointImportInput,
        isNew = false,
    ) => this.apollo
        .mutate<any>({
            mutation: createSupplyPointImportMutation,
            variables: {
                askForOfferId,
                supplyPoint,
            },
            update: (cache, { data }) => {
                const { findSupplyPointImports } = cache.readQuery(
                    {
                        query: findSupplyPointImportsQuery,
                        variables: {
                            askForOfferId,
                        },
                    });

                let newState = findSupplyPointImports;

                if (isNew) {
                    const newSupplyPoint = data.createSupplyPointImport;
                    newState = [...newState, newSupplyPoint];
                }

                cache.writeQuery({
                    query: findSupplyPointImportsQuery,
                    data: { findSupplyPointImports: newState },
                    variables: {
                        askForOfferId,
                    },
                });
            },
        })

    public setActiveSupplyPoint = (supplyPoint: ISupplyPoint) => this.apollo
        .mutate<any>({
                mutation: setActiveSupplyPointMutation,
                variables: {
                    supplyPoint,
                },
            },
        )

    public getCreateUser = () => this.apollo
        .watchQuery<any>({
                query: getCreateUserQuery,
            },
        ).valueChanges

    public deleteSupplyPointImportMutation = (supplyPointImportId: string, askForOfferId: string) => this.apollo
        .mutate<any>({
                mutation: deleteSupplyPointImportMutation,
                variables: {
                    supplyPointImportId,
                },
                update: (cache, { data }) => {
                    const { findSupplyPointImports } = cache.readQuery(
                        {
                            query: findSupplyPointImportsQuery,
                            variables: {
                                askForOfferId,
                            },
                        });

                    const newState = R.reject(R.propEq('id', supplyPointImportId))(findSupplyPointImports);

                    cache.writeQuery({
                        query: findSupplyPointImportsQuery,
                        data: { findSupplyPointImports: newState },
                        variables: {
                            askForOfferId,
                        },
                    });
                },
            },
        )

    public findSupplyPointImports = (
        askForOfferId: string,
    ) => this.apollo
        .watchQuery<any>({
                query: findSupplyPointImportsQuery,
                variables: {
                    askForOfferId,
                },
                fetchPolicy: 'cache-first',
            },
        ).valueChanges

    public mapPersonalInfoToPersonalInfoInput = (personalData: IPersonalData): IPersonalDataInput =>  omitTypeName({
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
    })

    public mapSupplyPointToSupplyPointInput = (supplyPoint: ISupplyPoint): ISupplyPointImportInput =>  {
        supplyPoint = omitTypeName(supplyPoint);
        const personalData = supplyPoint.contract?.personalData;
        return {
            id: supplyPoint.id,
            address: supplyPoint.address,
            expirationDate: supplyPoint.expirationDate,
            name: supplyPoint.name,
            timeToContractEnd: supplyPoint.timeToContractEnd,
            timeToContractEndPeriodId: supplyPoint.timeToContractEndPeriod?.code,
            contractEndTypeId: supplyPoint.contractEndType?.code,
            subjectTypeId: supplyPoint.subject?.code,
            supplierId: supplyPoint.supplier?.id,
            ...(!!personalData) && {
                personalData: this.mapPersonalInfoToPersonalInfoInput(personalData),
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
            importPriceTotalPerYear: supplyPoint?.importPriceTotalPerYear,
            importPricePerKwPowerVT: supplyPoint?.importPricePerKwPowerVT,
            importPricePerKwPowerNT: supplyPoint?.importPricePerKwPowerNT,
            importPricePerKwGas: supplyPoint?.importPricePerKwGas,
        };
    }

    public mapPricesToSupplyPointImport = (supplyPoint: ISupplyPointImportInput, data: ISupplyPoint): void =>  {
        supplyPoint.importPriceTotalPerYear = data?.importPriceTotalPerYear;
        supplyPoint.importPricePerKwPowerVT = data?.importPricePerKwPowerVT;
        supplyPoint.importPricePerKwPowerNT = data?.importPricePerKwPowerNT;
        supplyPoint.importPricePerKwGas = data?.importPricePerKwGas;
    }
}
