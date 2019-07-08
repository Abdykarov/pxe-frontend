import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export enum OverviewState {
    NO_REQUEST = 'NO_REQUEST',
    ALL_SUPPLY_POINTS_HAVE_SUPPLY = 'ALL_SUPPLY_POINTS_HAVE_SUPPLY' ,
    SOME_SUPPLY_POINTS_ENDING_SUPPLY = 'SOME_SUPPLY_POINTS_ENDING_SUPPLY',
    REQUESTS = 'REQUESTS',
}

export interface OverviewStateWrapper {
    overviewState: OverviewState;
    supplyPoints: ISupplyPoint[];
}

