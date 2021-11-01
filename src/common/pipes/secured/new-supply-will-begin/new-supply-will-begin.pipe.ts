import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import * as moment from 'moment';

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

    transform(supplyPointInput: ISupplyPointInput): Date  {
        if (supplyPointInput.ownTerminate) {
            supplyPointInput.contractEndTypeId = CONTRACT_END_TYPE.CONTRACT_END_TERMINATE;
        }
        if (supplyPointInput.withoutSupplier) {
            supplyPointInput.expirationDate = moment().toISOString();
        }
        const result: moment.Moment | boolean = R.cond([
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
        return result && (<moment.Moment>result).isValid() ? (<moment.Moment>result).toDate() : null;
    }
}
