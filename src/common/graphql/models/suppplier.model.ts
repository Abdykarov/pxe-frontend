import { IContract } from 'src/common/graphql/models/contract';

export interface IContractWithNameAndSupplyPointEan {
    contract: IContract;
    name: string;
    ean: string;
    offerId: string;
}
