import * as moment from 'moment';
import { Moment } from 'moment';

import { IFormSupplyPointDefinition } from 'src/common/pipes/new-supply-will-begin/new-supply-will-begin.model';
import { TimeToContractEndPeriod } from 'src/common/graphql/models/supply.model';

export const getNextDayFromExpirationDate = (form: IFormSupplyPointDefinition) =>
    form.expirationDate && moment(form.expirationDate).add(1, 'days');

export const calculateTerminateInterval = (from: Moment, form: IFormSupplyPointDefinition) =>
    moment(from).add(form.timeToContractEnd, form.timeToContractEndPeriodId === TimeToContractEndPeriod.DAY ? 'days' : 'month');

export const contractEndTermWithProlongationCalculate = (form: IFormSupplyPointDefinition) =>
    calculateTerminateInterval(moment(form.expirationDate), form).diff(moment()) < 0 && getNextDayFromExpirationDate(form) ;

export const contractEndIndefinitePeriodCalculate = (form: IFormSupplyPointDefinition) =>
    form.timeToContractEnd && form.timeToContractEndPeriodId &&
    calculateTerminateInterval(moment().add(30, 'days'), form).add(1, 'months').startOf('month');

