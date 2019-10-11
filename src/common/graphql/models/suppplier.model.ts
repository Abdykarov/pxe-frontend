import { IContract } from 'src/common/graphql/models/contract';
import { CommodityType } from 'src/common/graphql/models/supply.model';

export interface IPaginatedContractsWithNameAndSupplyPointEan {
    contractsWithNameAndEan: IContractWithNameAndSupplyPointEan[];
    totalRecords: number;
}

export interface IContractWithNameAndSupplyPointEan {
    contract: IContract;
    name: string;
    ean: string;
}

export interface IContractsBasedOnOffersFilter {
    offerId?: string;
    supplierId?: string;
    signDateFrom?: string;
    signDateTo?: string;
    commodityType?: CommodityType;
}

export interface IPaginationFilter {
    first: number;
    offset: number;
}
