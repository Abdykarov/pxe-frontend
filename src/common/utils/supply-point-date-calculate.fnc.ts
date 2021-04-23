import * as moment from 'moment';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { Moment } from 'moment';
import { unitOfTime } from 'moment';

import { CONSTS } from 'src/app/app.constants';
import {
    ISupplyPoint,
    ISupplyPointInput,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';

const getTimeToContractEndPeriod = (supplyPointInput: ISupplyPoint | ISupplyPointInput): TimeToContractEndPeriod =>
    R.cond([
        [
            R.pipe(
                R.path(['timeToContractEndPeriodId']),
                R_.isNotNil,
            ),
            R.path(['timeToContractEndPeriodId']),
        ],
        [
            R.pipe(
                R.path(['timeToContractEndPeriod', 'code']),
                R_.isNotNil,
            ),
            R.path(['timeToContractEndPeriod', 'code']),
        ],
        [
            R.T,
            R.always(TimeToContractEndPeriod.DAY),
        ],
    ])(supplyPointInput);

export const addOneDay = (date: Moment | string | Date): Moment =>
    moment(date)
        .startOf('day')
        .add(1, 'days');

export const addOneMonth = (from: Moment | string | Date): Moment =>
    moment(from)
        .startOf('day')
        .add(CONSTS.MONTH_DURATION, 'days');

export const addTerminateInterval = (from: Moment | string | Date, supplyPointInput: ISupplyPointInput | ISupplyPoint) =>
    moment(from)
        .startOf('day')
        .add(
            supplyPointInput.timeToContractEnd,
            getTimeToContractEndPeriod(supplyPointInput) === TimeToContractEndPeriod.DAY ? 'days' : 'month',
        );

export const getNextDayFromExpirationDate = (supplyPointInput: ISupplyPointInput | ISupplyPoint) =>
    supplyPointInput.expirationDate && addOneDay(supplyPointInput.expirationDate);

export const expirationDateIsInTerminateInterval = (supplyPointInput: ISupplyPointInput | ISupplyPoint) => {
    const terminateInterval: Moment = addTerminateInterval(
        moment(),
        supplyPointInput,
    );
    const terminateIntervalWithProcessingTime = terminateInterval.add(CONSTS.TIME_TO_CONTRACT_END_PROLONGED_IN_DAYS, 'days');
    const expirationDate = moment(supplyPointInput.expirationDate).startOf('day');
    return terminateIntervalWithProcessingTime.diff(expirationDate) >= 0;
};

export const contractEndTermWithProlongation = (supplyPointInput: ISupplyPointInput | ISupplyPoint) =>
    !expirationDateIsInTerminateInterval(supplyPointInput) && getNextDayFromExpirationDate(supplyPointInput);

export const contractEndIndefinitePeriod = (supplyPointInput: ISupplyPointInput) =>
    supplyPointInput.timeToContractEnd && supplyPointInput.timeToContractEndPeriodId &&
    addTerminateInterval(
        addOneMonth(moment()),
        supplyPointInput,
    )
        .add(1, 'months')
        .startOf('month');

export const dateDiff = (dateFromString: string, dateToString: string, resultUnit: unitOfTime.Diff = 'days') => {
    const from = moment(dateFromString);
    const to = moment(dateToString);
    return to.diff(from, resultUnit);
};
