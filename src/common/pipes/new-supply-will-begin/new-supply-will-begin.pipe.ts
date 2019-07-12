import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import {
    isContractEndDefault,
    isContractEndIndefinitePeriod,
    isContractEndTermOrRequest,
    isContractEndTermWithProlongation,
} from 'src/common/pipes/new-supply-will-begin/new-supply-will-begin.state.fnc';
import {
    contractEndIndefinitePeriodCalculate,
    contractEndTermWithProlongationCalculate,
    getNextDayFromExpirationDate,
} from 'src/common/pipes/new-supply-will-begin/new-supply-will-begin.calculate.fnc';
import { IFormSupplyPointDefinition } from 'src/common/pipes/new-supply-will-begin/new-supply-will-begin.model';

@Pipe({
  name: 'newSupplyWillBegin',
})
export class NewSupplyWillBeginPipe implements PipeTransform {
    transform(form: IFormSupplyPointDefinition): string | boolean {
        return R.cond([
            [
                isContractEndDefault,
                false,
            ],
            [
                isContractEndTermWithProlongation,
                contractEndTermWithProlongationCalculate,
            ],
            [
                isContractEndTermOrRequest,
                getNextDayFromExpirationDate,
            ],
            [
                isContractEndIndefinitePeriod,
                contractEndIndefinitePeriodCalculate,
            ],
        ])(form);
    }
}
