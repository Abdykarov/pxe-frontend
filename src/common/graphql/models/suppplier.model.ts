import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IContract } from 'src/common/graphql/models/contract';

export interface IPaginatedContractsWithNameAndSupplyPointEan {
    page: IContractWithNameAndSupplyPointEan[];
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
    pagination?: IPagination;
}

export interface IPagination {
    first: number;
    offset: number;
}
