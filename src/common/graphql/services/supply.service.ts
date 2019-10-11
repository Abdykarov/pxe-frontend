import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    computeAndGetSupplyPointStatisticsQuery,
    findAllSuppliersQuery,
    findCodelistsByTypesQuery,
    findSupplierDocumentsByComodityQuery,
    findSupplyPointsByContractStatusQuery,
    findSupplyPointsQuery,
    getCodelistByTypeQuery,
    getSupplyPointGlobalStatisticsQuery,
    getSupplyPointQuery,
} from 'src/common/graphql/queries/supply';
import {
    createGasSupplyPointMutation,
    updateGasSupplyPointMutation,
    updateGasSupplyPointWithContractMutation,
    createPowerSupplyPointMutation,
    updatePowerSupplyPointMutation,
    updatePowerSupplyPointWithContractMutation,
} from 'src/common/graphql/mutation/supply';

@Injectable({
    providedIn: 'root',
})
export class SupplyService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getSuppliers = (commodityType: CommodityType) => this.apollo
        .watchQuery<any>({
            query: findAllSuppliersQuery,
            variables: {
                commodityType,
            },
        })
        .valueChanges

    public getCodelistByType = (type: string, locale: string) => this.apollo
        .watchQuery<any>({
            query: getCodelistByTypeQuery,
            variables: {
                type,
                locale,
            },
        })
        .valueChanges

    public findCodelistsByTypes = (types: string[], locale: string) => this.apollo
        .watchQuery<any>({
            query: findCodelistsByTypesQuery,
            variables: {
                types,
                locale,
            },
        })
        .valueChanges

    public findSupplierDocumentsByComodity = (supplierId: number, commodityType: CommodityType) => this.apollo
        .watchQuery<any>({
            query: findSupplierDocumentsByComodityQuery,
            variables: {
                supplierId,
                commodityType,
            },
        })
        .valueChanges

    public findSupplyPoints = (ean: string = null) => this.apollo
        .watchQuery<any>({
            query: findSupplyPointsQuery,
            variables: {
                ean,
            },
        })
        .valueChanges

    public createPowerSupplyPoint = (supplyPoint: ISupplyPoint, powerAttributes: ISupplyPointPowerAttributes) => this.apollo
        .mutate<any>({
            mutation: createPowerSupplyPointMutation,
            variables: {
                supplyPoint,
                powerAttributes,
            },
        })

    public createGasSupplyPoint = (supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointGasAttributes) => this.apollo
        .mutate<any>({
            mutation: createGasSupplyPointMutation,
            variables: {
                supplyPoint,
                gasAttributes,
            },
        })

    public updatePowerSupplyPoint = (
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        powerAttributes: ISupplyPointPowerAttributes,
    ) => this.apollo
        .mutate<any>({
            mutation: updatePowerSupplyPointMutation,
            variables: {
                supplyPointId,
                supplyPoint,
                powerAttributes,
            },
        })

    public updateGasSupplyPoint = (
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        gasAttributes: ISupplyPointGasAttributes,
    ) => this.apollo
        .mutate<any>({
            mutation: updateGasSupplyPointMutation,
            variables: {
                supplyPointId,
                supplyPoint,
                gasAttributes,
            },
        })

    public updatePowerSupplyPointWithContract = (
        supplyPointId: number,
        supplyPointUpdate: ISupplyPoint,
        attributes: ISupplyPointPowerAttributes,
    ) => this.apollo
        .mutate<any>({
            mutation: updatePowerSupplyPointWithContractMutation,
            variables: {
                supplyPointId,
                supplyPointUpdate,
                attributes,
            },
        })

    public updateGasSupplyPointWithContract = (
        supplyPointId: number,
        supplyPointUpdate: ISupplyPoint,
        attributes: ISupplyPointGasAttributes,
    ) => this.apollo
        .mutate<any>({
            mutation: updateGasSupplyPointWithContractMutation,
            variables: {
                supplyPointId,
                supplyPointUpdate,
                attributes,
            },
        })

    public getSupplyPoint = (supplyPointId: string) => this.apollo
        .watchQuery<any>({
            fetchPolicy: 'network-only',
            query: getSupplyPointQuery,
            variables: {
                supplyPointId,
            },
        })
        .valueChanges

    public findSupplyPointsByContractStatus = (ean: string, contractStatus: ContractStatus[]) => this.apollo
        .watchQuery<any>({
            fetchPolicy: 'network-only',
            query: findSupplyPointsByContractStatusQuery,
            variables: {
                ean,
                contractStatus,
            },
        })
        .valueChanges

    public computeAndGetSupplyPointStatistics = () => this.apollo
        .watchQuery<any>({
            fetchPolicy: 'network-only',
            query: computeAndGetSupplyPointStatisticsQuery,
        })
        .valueChanges

    public getSupplyPointGlobalStatistics = (includeHistoryData: boolean = false) => this.apollo
        .watchQuery<any>({
            fetchPolicy: 'network-only',
            query: getSupplyPointGlobalStatisticsQuery,
            variables: {
                includeHistoryData,
            },
        })
        .valueChanges
}
