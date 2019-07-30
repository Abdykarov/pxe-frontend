import * as R from 'ramda';

import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import {
    OverviewState,
    OverviewStateWrapper,
} from 'src/app/pages/requests-overview/requests-overview.model';

export const hasAnyRequest = (supplyPoints: ISupplyPoint[]): boolean =>
    R.find((supplyPoint: ISupplyPoint) => (isSupplyPointInRequestState(supplyPoint)), supplyPoints);

export const isSupplyPointInRequestState = (supplyPoint: ISupplyPoint): boolean =>
    supplyPoint.contract === null || supplyPoint.contract.contractStatus === ContractStatus.NOT_CONCLUDED;

// public isAnyContractEnding = (supplyPoints: ISupplyPoint[]): boolean =>
//     R.find((supplyPoint: ISupplyPoint) => this.contractEnding(supplyPoint), supplyPoints)

// public contractEnding = (supplyPoint: ISupplyPoint) =>
//     supplyPoint.contract
//         && this.dateDiffPipe.transform(
//             supplyPoint.contract.deliveryTo, moment().add(CONSTS.MONTHS_TO_CONTRACT_END , 'month')
//             .toISOString(), 'seconds') <= 0
//         && this.dateDiffPipe.transform(moment().toISOString(), supplyPoint.contract.deliveryTo, 'seconds') >= 0


export const getOverviewState = (supplyPointsInput: ISupplyPoint[]): OverviewStateWrapper =>
    R.cond([
        [
            R.isEmpty,
            () => ({
                overviewState: OverviewState.NO_REQUEST,
                supplyPoints: [],
            }),
        ],
        [
            hasAnyRequest,
            (supplyPoints: ISupplyPoint[]) => ({
                overviewState: OverviewState.REQUESTS,
                supplyPoints: R.filter((supplyPoint: ISupplyPoint) => isSupplyPointInRequestState(supplyPoint), supplyPoints),
            }),
        ],
        [
            R.T,
            () => ({
                overviewState: OverviewState.NO_REQUEST_WITH_VALID_CONTRACT,
            }),
        ],
    ])(supplyPointsInput);
