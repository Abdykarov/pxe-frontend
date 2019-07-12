import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    CommodityType,
    ISupplyPoint,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from '../models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    getCodelistByTypeQuery,
    getSupplyPointQuery,
    findAllSuppliersQuery,
    findCodelistsByTypesQuery,
    findSupplierDocumentsByComodityQuery,
    findSupplyPointsByContractStatus,
    findSupplyPointsQuery,
} from 'src/common/graphql/queries/supply';
import {
    createGasSupplyPointMutation,
    createPowerSupplyPointMutation,
    updateGasSupplyPointMutation,
    updateGasSupplyPointWithContractMutation,
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
        .mutate({
            mutation: createPowerSupplyPointMutation,
            variables: {
                supplyPoint,
                powerAttributes,
            },
            refetchQueries: [{
                query: findSupplyPointsQuery,
                variables: {
                    ean: null,
                },
            }],
        })

    public createGasSupplyPoint = (supplyPoint: ISupplyPoint, gasAttributes: ISupplyPointGasAttributes) => this.apollo
        .mutate({
            mutation: createGasSupplyPointMutation,
            variables: {
                supplyPoint,
                gasAttributes,
            },
            refetchQueries:  [{
                query: findSupplyPointsQuery,
                variables: {
                    ean: null,
                },
            }],
        })

    public updatePowerSupplyPoint = (
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        powerAttributes: ISupplyPointPowerAttributes,
    ) => this.apollo
        .mutate({
            mutation: updatePowerSupplyPointMutation,
            variables: {
                supplyPointId,
                supplyPoint,
                powerAttributes,
            },
            refetchQueries: [{
                query: findSupplyPointsQuery,
                variables: {
                    ean: null,
                },
            }],
        })

    public updateGasSupplyPoint = (
        supplyPointId: number,
        supplyPoint: ISupplyPoint,
        gasAttributes: ISupplyPointGasAttributes,
    ) => this.apollo
        .mutate({
            mutation: updateGasSupplyPointMutation,
            variables: {
                supplyPointId,
                supplyPoint,
                gasAttributes,
            },
            refetchQueries:  [{
                query: findSupplyPointsQuery,
                variables: {
                    ean: null,
                },
            }],
        })

    public updatePowerSupplyPointWithContract = (
        supplyPointId: number,
        supplyPointUpdate: ISupplyPoint,
        attributes: ISupplyPointPowerAttributes,
    ) => this.apollo
        .mutate({
            mutation: updatePowerSupplyPointWithContractMutation,
            variables: {
                supplyPointId,
                supplyPointUpdate,
                attributes,
            },
            refetchQueries: [{
                query: findSupplyPointsQuery,
                variables: {
                    ean: null,
                },
            }],
        })

    public updateGasSupplyPointWithContract = (
        supplyPointId: number,
        supplyPointUpdate: ISupplyPoint,
        attributes: ISupplyPointGasAttributes,
    ) => this.apollo
        .mutate({
            mutation: updateGasSupplyPointWithContractMutation,
            variables: {
                supplyPointId,
                supplyPointUpdate,
                attributes,
            },
            refetchQueries: [{
                query: findSupplyPointsQuery,
                variables: {
                    ean: null,
                },
            }],
        })

    public getSupplyPoint = (supplyPointId: string) => this.apollo
        .watchQuery<any>({
            query: getSupplyPointQuery,
            variables: {
                supplyPointId,
            },
        })
        .valueChanges

    public findSupplyPointsByContractStatus = (ean: string, contractStatus: ContractStatus[]) => this.apollo
        .watchQuery<any>({
            query: findSupplyPointsByContractStatus,
            variables: {
                ean,
                contractStatus,
            },
        })
        .valueChanges

    public removeSupplyPoint = (supplyPointId: string) => {
    }

}
