import * as moment from 'moment';
import { Moment } from 'moment';

import { CONSTS } from 'src/app/app.constants';
import {
    ISupplyPointInput,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';

export const getNextDayFromExpirationDate = (supplyPointInput: ISupplyPointInput) =>
    supplyPointInput.expirationDate && moment(supplyPointInput.expirationDate).add(1, 'days');

export const contractEndTermWithProlongation = (supplyPointInput: ISupplyPointInput) =>
    calculateTerminateInterval(moment(supplyPointInput.expirationDate), supplyPointInput).diff(moment()) < 0 &&
    getNextDayFromExpirationDate(supplyPointInput) ;

export const contractEndIndefinitePeriod = (supplyPointInput: ISupplyPointInput) =>
    supplyPointInput.timeToContractEnd && supplyPointInput.timeToContractEndPeriodId &&
    calculateTerminateInterval(moment().add(CONSTS.MONTH_DURATION, 'days'), supplyPointInput).add(1, 'months').startOf('month');

export const calculateTerminateInterval = (from: Moment, supplyPointInput: ISupplyPointInput) =>
    moment(from).add(supplyPointInput.timeToContractEnd,
        supplyPointInput.timeToContractEndPeriodId === TimeToContractEndPeriod.DAY ? 'days' : 'month');

