import * as moment from 'moment';
import * as R from 'ramda';
import { CONSTS } from 'src/app/app.constants';
import {
    OverviewState,
    OverviewStateWrapper,
} from 'src/app/pages/consumers/requests-overview/requests-overview.model';
import { ContractStatus } from 'src/common/graphql/models/contract';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { DateDiffPipe } from '../pipes/secured/date-diff/date-diff.pipe';

export const isSupplyPointInRequestState = (
    supplyPoint: ISupplyPoint
): boolean =>
    supplyPoint.contract === null ||
    supplyPoint.contract.contractStatus === ContractStatus.NOT_CONCLUDED ||
    supplyPoint.imported;

export const hasAnyRequest = (supplyPoints: ISupplyPoint[]): boolean =>
    R.find(
        (supplyPoint: ISupplyPoint) => isSupplyPointInRequestState(supplyPoint),
        supplyPoints
    );

export const contractEnding = (
    supplyPoint: ISupplyPoint,
    dateDiffPipe: DateDiffPipe
) =>
    supplyPoint.contract &&
    dateDiffPipe.transform(
        supplyPoint.contract.deliveryTo,
        moment().add(CONSTS.MONTHS_TO_CONTRACT_END, 'month').toISOString(),
        'seconds'
    ) <= 0 &&
    dateDiffPipe.transform(
        moment().toISOString(),
        supplyPoint.contract.deliveryTo,
        'seconds'
    ) >= 0;

export const isAnyContractEnding = (
    supplyPoints: ISupplyPoint[],
    dateDiffPipe
): boolean =>
    R.find(
        (supplyPoint: ISupplyPoint) =>
            contractEnding(supplyPoint, dateDiffPipe),
        supplyPoints
    );

export const getOverviewState = (
    supplyPointsInput: ISupplyPoint[]
): OverviewStateWrapper =>
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
                supplyPoints: R.filter(
                    (supplyPoint: ISupplyPoint) =>
                        isSupplyPointInRequestState(supplyPoint),
                    supplyPoints
                ),
            }),
        ],
        // [
        //     this.isAnyContractEnding,
        //     (supplyPoints: ISupplyPoint[]) => ({
        //         overviewState: OverviewState.SOME_SUPPLY_POINTS_ARE_ENDING ,
        //         supplyPoints: R.filter((supplyPoint: ISupplyPoint) => this.contractEnding(supplyPoint), supplyPoints),
        //     }),
        // ],
        [
            R.T,
            () => ({
                overviewState: OverviewState.NO_REQUEST_WITH_VALID_CONTRACT,
                supplyPoints: [],
            }),
        ],
    ])(supplyPointsInput);
