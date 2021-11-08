import * as moment from 'moment';
import * as R from 'ramda';
import { IHistory } from 'src/common/containers/history/models/history';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

const removeNonHistorySupplyPoints =
    (currentYear: number) => (supplyPoints: ISupplyPoint[]) =>
        R.filter(
            (supplyPoint: ISupplyPoint) =>
                moment(supplyPoint.contract.deliveryTo).toDate().getTime() <
                currentYear
        )(supplyPoints);

const groupByDeliveryTo = (supplyPoints: ISupplyPoint[]): IHistory =>
    R.groupBy(
        (supplyPoint: ISupplyPoint) =>
            moment(supplyPoint.contract.deliveryTo).year(),
        supplyPoints
    );

const orderByDeliveryTo = (supplyPoints: ISupplyPoint[]): ISupplyPoint[] =>
    R.sortBy(R.prop('deliveryTo'))(supplyPoints);

export const concludedSupplyPointsToHistory =
    (currentYear: number) =>
    (supplyPoints: ISupplyPoint[]): IHistory =>
        R.pipe(
            removeNonHistorySupplyPoints(currentYear),
            orderByDeliveryTo,
            groupByDeliveryTo
        )(supplyPoints);
