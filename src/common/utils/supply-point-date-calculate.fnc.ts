import * as moment from 'moment';
import { Moment } from 'moment';

import { CONSTS } from 'src/app/app.constants';
import {
    ISupplyPointInput,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';
import { unitOfTime } from 'moment';

export const getNextDayFromExpirationDate = (supplyPointInput: ISupplyPointInput) =>
    supplyPointInput.expirationDate && moment(supplyPointInput.expirationDate).add(1, 'days');

export const calculateTerminateInterval = (from: Moment, supplyPointInput: ISupplyPointInput) =>
    moment(from.startOf('day')).add(supplyPointInput.timeToContractEnd,
        supplyPointInput.timeToContractEndPeriodId === TimeToContractEndPeriod.DAY ? 'days' : 'month');

export const contractEndTermWithProlongation = (supplyPointInput: ISupplyPointInput) =>
    calculateTerminateInterval(moment(supplyPointInput.expirationDate), supplyPointInput).diff(moment().startOf('day')) < 0 &&
    getNextDayFromExpirationDate(supplyPointInput) ;

export const addOneMonth = (from: Moment): Moment => moment(from.startOf('day')).add(CONSTS.MONTH_DURATION, 'days');

export const contractEndIndefinitePeriod = (supplyPointInput: ISupplyPointInput) =>
    supplyPointInput.timeToContractEnd && supplyPointInput.timeToContractEndPeriodId &&
    calculateTerminateInterval(addOneMonth(moment().startOf('day')), supplyPointInput).add(1, 'months').startOf('month');


export const dateDiff = (dateFromString: string, dateToString: string, resultUnit: unitOfTime.Diff = 'days') => {
    const from = moment(dateFromString);
    const to = moment(dateToString);
    return to.diff(from, resultUnit);
};
