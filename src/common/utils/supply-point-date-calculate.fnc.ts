import * as moment from 'moment';
import { Moment } from 'moment';

import { CONSTS } from 'src/app/app.constants';
import {
    ISupplyPointInput,
    TimeToContractEndPeriod,
} from 'src/common/graphql/models/supply.model';

export const getNextDayFromExpirationDate = (form: ISupplyPointInput) =>
    form.expirationDate && moment(form.expirationDate).add(1, 'days');

export const contractEndTermWithProlongation = (form: ISupplyPointInput) =>
    calculateTerminateInterval(moment(form.expirationDate), form).diff(moment()) < 0 && getNextDayFromExpirationDate(form) ;

export const contractEndIndefinitePeriod = (form: ISupplyPointInput) =>
    form.timeToContractEnd && form.timeToContractEndPeriodId &&
    calculateTerminateInterval(moment().add(CONSTS.MONTH_DURATION, 'days'), form).add(1, 'months').startOf('month');

export const calculateTerminateInterval = (from: Moment, form: ISupplyPointInput) =>
    moment(from).add(form.timeToContractEnd, form.timeToContractEndPeriodId === TimeToContractEndPeriod.DAY ? 'days' : 'month');

