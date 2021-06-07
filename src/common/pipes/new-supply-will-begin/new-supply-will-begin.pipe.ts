import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import { Moment } from 'moment';

import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import {
    contractEndIndefinitePeriod,
    contractEndTermWithProlongation,
    getNextDayFromExpirationDate,
} from 'src/common/utils/supply-point-date-calculate.fnc';
import { ISupplyPointInput } from 'src/common/graphql/models/supply.model';

@Pipe({
  name: 'newSupplyWillBegin',
})
export class NewSupplyWillBeginPipe implements PipeTransform {
    transform(supplyPointInput: ISupplyPointInput): Date  {
        return new Date();
    }
}
