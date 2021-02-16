import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

export enum OverviewState {
    NO_REQUEST = 'NO_REQUEST',
    NO_REQUEST_WITH_VALID_CONTRACT = 'NO_REQUEST_WITH_VALID_CONTRACT' ,
    SOME_SUPPLY_POINTS_ARE_ENDING  = 'SOME_SUPPLY_POINTS_ARE_ENDING ',
    REQUESTS = 'REQUESTS',
}

export interface OverviewStateWrapper {
    overviewState: OverviewState;
    supplyPoints: ISupplyPoint[];
}

