import * as moment from 'moment';
import * as R from 'ramda';
import { Moment } from 'moment';

import { CONSTS } from 'src/app/app.constants';
import {
    ISupplyPoint,
    ISupplyPointInput,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';

export const getNextDayFromExpirationDate = (supplyPointInput: ISupplyPointInput | ISupplyPoint) =>
    supplyPointInput.expirationDate && moment(supplyPointInput.expirationDate).add(1, 'days');

export const calculateTerminateInterval = (from: Moment, supplyPointInput: ISupplyPointInput | ISupplyPoint) =>
    moment(from.startOf('day')).add(supplyPointInput.timeToContractEnd,
        getTimeToContractEndPeriod(supplyPointInput)
        === TimeToContractEndPeriod.DAY ? 'days' : 'month');

export const contractEndTermWithProlongation = (supplyPointInput: ISupplyPointInput | ISupplyPoint) =>
    calculateTerminateInterval(
        moment(moment().startOf('day')), supplyPointInput,
    ).diff(
        moment(supplyPointInput.expirationDate,
    ).startOf('day'))
        <= 0
    && getNextDayFromExpirationDate(supplyPointInput);


export const addOneMonth = (from: Moment): Moment => moment(from.startOf('day')).add(CONSTS.MONTH_DURATION, 'days');

export const contractEndIndefinitePeriod = (supplyPointInput: ISupplyPointInput) =>
    supplyPointInput.timeToContractEnd && supplyPointInput.timeToContractEndPeriodId &&
    calculateTerminateInterval(addOneMonth(moment().startOf('day')), supplyPointInput).add(1, 'months').startOf('month');

// to do zvazit refactor
const getTimeToContractEndPeriod = (supplyPointInput: any): TimeToContractEndPeriod => {
    if (supplyPointInput.timeToContractEndPeriodId !== undefined) {
        return supplyPointInput.timeToContractEndPeriodId;
    } else {
        if (R.empty(supplyPointInput.timeToContractEndPeriod)) {
            return TimeToContractEndPeriod.DAY;
        } else {
            return supplyPointInput.timeToContractEndPeriod.code;
        }
    }
};
