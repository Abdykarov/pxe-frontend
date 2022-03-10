import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export interface IHistory {
    [key: string]: ISupplyPoint[];
}
