import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IContract } from 'src/common/graphql/models/contract';

export interface IPaginatedContractsWithNameAndSupplyPoint {
    page: IContractWithNameAndSupplyPoint[];
    totalRecords: number;
}

export interface IContractWithNameAndSupplyPoint {
    contract: IContract;
    name: string;
    identificationNumber: string;
}

export interface IContractsBasedOnOffersFilter {
    offerId?: string;
    supplierId?: string;
    signDateFrom?: string;
    signDateTo?: string;
    commodityType?: CommodityType;
    pagination?: IPagination;
}

export interface IPagination {
    first: number;
    offset: number;
}

export interface ISupplierInput {
    numberSeriesPrefix: String;
    numberSeriesVariable: String;
    numberSeriesSuffix: String;
    pricesUrl: String;
}
