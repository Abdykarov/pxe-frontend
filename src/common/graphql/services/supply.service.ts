import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import {
    createGasSupplyPointMutation,
    createPowerSupplyPointMutation,
    deleteUnfinishedSupplyPointMutation,
    updateGasSupplyPointMutation,
    updateGasSupplyPointWithContractMutation,
    updatePowerSupplyPointMutation,
    updatePowerSupplyPointWithContractMutation,
} from 'src/common/graphql/mutation/supply';
import {
    computeAndGetSupplyPointStatisticsQuery,
    findAllSuppliersQuery,
    findCodelistsByTypesQuery,
    findSupplierDocumentsByComodityQuery,
    findSupplyPointByContractIdQuery,
    findSupplyPointsByContractStatusQuery,
    findSupplyPointsConcludedByContractTypeQuery,
    getCodelistByTypeQuery,
    getSupplyPointGlobalStatisticsQuery,
    getSupplyPointQuery,
} from 'src/common/graphql/queries/supply';

@Injectable({
    providedIn: 'root',
})
export class SupplyService {
    constructor(private apollo: Apollo) {}

    public getSuppliers = (commodityType: CommodityType) =>
        this.apollo.watchQuery<any>({
            query: findAllSuppliersQuery,
            variables: {
                commodityType,
            },
        }).valueChanges;

    public getByContractId = (contractId: string) =>
        this.apollo.watchQuery<any>({
            query: findSupplyPointByContractIdQuery,
            variables: {
                contractId,
            },
        }).valueChanges;

    public getCodelistByType = (type: string, locale: string) =>
        this.apollo.watchQuery<any>({
            query: getCodelistByTypeQuery,
            variables: {
                type,
                locale,
            },
        }).valueChanges;

    public findCodelistsByTypes = (types: string[], locale: string) =>
        this.apollo.watchQuery<any>({
            query: findCodelistsByTypesQuery,
            variables: {
                types,
                locale,
            },
        }).valueChanges;

    public findSupplierDocumentsByComodity = (
        supplierId: number,
        commodityType: CommodityType
    ) =>
        this.apollo.watchQuery<any>({
            query: findSupplierDocumentsByComodityQuery,
            variables: {
                supplierId,
                commodityType,
            },
        }).valueChanges;

    public createPowerSupplyPoint = (
        supplyPoint: ISupplyPoint,
        powerAttributes: ISupplyPointPowerAttributes
    ) =>
        this.apollo.mutate<any>({
            mutation: createPowerSupplyPointMutation,
            variables: {
                supplyPoint,
                powerAttributes,
            },
        });

    public createGasSupplyPoint = (
        supplyPoint: ISupplyPoint,
        gasAttributes: ISupplyPointGasAttributes
    ) =>
        this.apollo.mutate<any>({
            mutation: createGasSupplyPointMutation,
            variables: {
                supplyPoint,
                gasAttributes,
            },
        });

    public updatePowerSupplyPoint = (
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        powerAttributes: ISupplyPointPowerAttributes
    ) =>
        this.apollo.mutate<any>({
            mutation: updatePowerSupplyPointMutation,
            variables: {
                supplyPointId,
                supplyPoint,
                powerAttributes,
            },
        });

    public updateGasSupplyPoint = (
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        gasAttributes: ISupplyPointGasAttributes
    ) =>
        this.apollo.mutate<any>({
            mutation: updateGasSupplyPointMutation,
            variables: {
                supplyPointId,
                supplyPoint,
                gasAttributes,
            },
        });

    public updatePowerSupplyPointWithContract = (
        supplyPointId: number,
        supplyPointUpdate: ISupplyPoint,
        attributes: ISupplyPointPowerAttributes
    ) =>
        this.apollo.mutate<any>({
            mutation: updatePowerSupplyPointWithContractMutation,
            variables: {
                supplyPointId,
                supplyPointUpdate,
                attributes,
            },
        });

    public updateGasSupplyPointWithContract = (
        supplyPointId: number,
        supplyPointUpdate: ISupplyPoint,
        attributes: ISupplyPointGasAttributes
    ) =>
        this.apollo.mutate<any>({
            mutation: updateGasSupplyPointWithContractMutation,
            variables: {
                supplyPointId,
                supplyPointUpdate,
                attributes,
            },
        });

    public getSupplyPoint = (
        supplyPointId: string,
        contractId: string = null,
        useInitialLoading = false,
        noCache = true
    ) =>
        this.apollo.watchQuery<any>({
            fetchPolicy: !noCache || !contractId ? 'network-only' : 'no-cache',
            query: getSupplyPointQuery,
            variables: {
                supplyPointId,
                ...(!!contractId && { contractId }),
            },
            useInitialLoading,
        }).valueChanges;

    public findSupplyPointsByContractStatus = (
        contractStatus: ContractStatus[],
        identificationNumber: string = null,
        skipOfferValidity = false,
        useInitialLoading = false
    ) =>
        this.apollo.watchQuery<any>({
            fetchPolicy: 'no-cache',
            query: findSupplyPointsByContractStatusQuery,
            variables: {
                identificationNumber,
                contractStatus,
                skipOfferValidity,
            },
            useInitialLoading,
        }).valueChanges;

    public findSupplyPointsConcludedByContractType = (contractType: string) =>
        this.apollo.watchQuery<any>({
            fetchPolicy: 'no-cache',
            query: findSupplyPointsConcludedByContractTypeQuery,
            variables: {
                contractType,
            },
            useInitialLoading: true,
        }).valueChanges;

    public computeAndGetSupplyPointStatistics = () =>
        this.apollo.watchQuery<any>({
            fetchPolicy: 'network-only',
            query: computeAndGetSupplyPointStatisticsQuery,
        }).valueChanges;

    public getSupplyPointGlobalStatistics = (
        includeHistoryData: boolean = false
    ) =>
        this.apollo.watchQuery<any>({
            fetchPolicy: 'network-only',
            query: getSupplyPointGlobalStatisticsQuery,
            variables: {
                includeHistoryData,
            },
        }).valueChanges;

    public deleteUnfinishedSupplyPoint = (supplyPointId: string) =>
        this.apollo.mutate<any>({
            mutation: deleteUnfinishedSupplyPointMutation,
            variables: {
                supplyPointId,
            },
        });
}
