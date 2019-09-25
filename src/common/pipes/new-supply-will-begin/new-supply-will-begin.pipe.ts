import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import {
    contractEndIndefinitePeriod,
    contractEndTermWithProlongation,
    getNextDayFromExpirationDate,
} from 'src/common/utils/supply-point-date-calculate.fnc';
import { ISupplyPointInput } from 'src/common/graphql/models/supply.model';
import { Moment } from 'moment';

@Pipe({
  name: 'newSupplyWillBegin',
})
export class NewSupplyWillBeginPipe implements PipeTransform {
    isContractEndDefault = (supplyPointInput: ISupplyPointInput) =>
        R.equals(supplyPointInput.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_DEFAULT)

    isContractEndTerm = (supplyPointInput: ISupplyPointInput) =>
        R.equals(supplyPointInput.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERM)

    isContractEndRequest = (supplyPointInput: ISupplyPointInput) =>
        R.equals(supplyPointInput.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERMINATE)

    isContractEndTermWithProlongation = (supplyPointInput: ISupplyPointInput) =>
        R.equals(supplyPointInput.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION)

    isContractEndIndefinitePeriod = (supplyPointInput: ISupplyPointInput) =>
        R.equals(supplyPointInput.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD)

    isContractEndTermOrRequest = (supplyPointInput: ISupplyPointInput) =>
        this.isContractEndTerm(supplyPointInput) || this.isContractEndRequest(supplyPointInput)

    transform(supplyPointInput: ISupplyPointInput): Date | boolean  {
        if (supplyPointInput.ownTerminate) {
            supplyPointInput.contractEndTypeId = CONTRACT_END_TYPE.CONTRACT_END_TERMINATE;
        }

        const result: Moment | boolean = R.cond([
            [
                this.isContractEndDefault,
                false,
            ],
            [
                this.isContractEndTermWithProlongation,
                contractEndTermWithProlongation,
            ],
            [
                this.isContractEndTermOrRequest,
                getNextDayFromExpirationDate,
            ],
            [
                this.isContractEndIndefinitePeriod,
                contractEndIndefinitePeriod,
            ],
        ])(supplyPointInput);
        return result && (<Moment>result).isValid() ? (<Moment>result).toDate() : null;
    }
}
