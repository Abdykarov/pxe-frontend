import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export enum OverviewState {
    NO_REQUEST = 'NO_REQUEST',
    REQUESTS_HAVE_CONTRACTS = 'REQUESTS_HAVE_CONTRACTS' ,
    REQUESTS_END_IN_TWO_MONTHS = 'REQUESTS_END_IN_TWO_MONTHS',
    REQUESTS = 'REQUESTS',
}

export interface OverviewStateWrapper {
    overviewState: OverviewState;
    supplyPoints: ISupplyPoint[];
}

