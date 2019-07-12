import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';

import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { IFormSupplyPointDefinition } from 'src/common/pipes/new-supply-will-begin/new-supply-will-begin.model';
import { TimeToContractEndPeriod } from 'src/common/graphql/models/supply.model';

@Pipe({
  name: 'newSupplyWillBegin',
})
export class NewSupplyWillBeginPipe implements PipeTransform {
    transform(form: IFormSupplyPointDefinition): string | boolean {
        console.log('JSEM V PIPE');
        return R.cond([
            [
                (formDef: IFormSupplyPointDefinition) => {
                    console.log(formDef);
                    return R.equals(formDef.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_DEFAULT);
                },
                false,
            ],
            [
                (formDef: IFormSupplyPointDefinition) =>
                    R.equals(formDef.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLOGATION),
                (formDef: IFormSupplyPointDefinition) => form.expirationDate && moment(form.expirationDate).add(1, 'days') &&
                        moment().add(form.timeToContractEnd, formDef.contractEndTypeId === TimeToContractEndPeriod.DAY ? 'days' : 'month')
                            .diff(moment()) < 0,
            ],
            [
                (formDef: IFormSupplyPointDefinition) =>
                    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_TERM) ||
                    R.equals(form.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_REQUEST),
                (formDef: IFormSupplyPointDefinition) =>
                    form.expirationDate && moment(form.expirationDate).add(1, 'days'),
            ],
            [
                (formDef: IFormSupplyPointDefinition) =>
                    R.equals(formDef.contractEndTypeId, CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD),
                (formDef: IFormSupplyPointDefinition) =>
                    formDef.timeToContractEnd && moment().add(30, 'days').add(
                        form.timeToContractEnd, formDef.contractEndTypeId === TimeToContractEndPeriod.DAY ? 'days' : 'month')
                        .add(1, 'months').startOf('month'),
            ],
        ])(form);
    }
}
