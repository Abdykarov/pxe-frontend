import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export enum OverviewState {
    NO_REQUEST,
    REQUESTS_HAVE_CONTRACTS,
    REQUESTS_END_IN_TWO_MONTHS,
    REQUESTS,
}

export interface OverviewStateWrapper {
    overviewState: OverviewState;
    supplyPoints: ISupplyPoint[];
}

