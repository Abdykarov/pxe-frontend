import { Injectable } from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';

import {
    addOneMonth,
    dateDiff,
} from 'src/common/utils/supply-point-date-calculate.fnc';
import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { inArray } from 'src/common/utils';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class ValidityService {
    public validateOffer = (supplyPoint: ISupplyPoint): boolean =>
        R.cond([
            [this.validateOnlyDateExpiration, this.isValidateDateExpiration],
            [R.T, this.isValidateDateExpiration],
        ])(supplyPoint)


    private validateOnlyDateExpiration = (supplyPoint: ISupplyPoint): boolean =>
        inArray(supplyPoint, [CONTRACT_END_TYPE.CONTRACT_END_TERM, CONTRACT_END_TYPE.CONTRACT_END_TERMINATE])

    private isValidateDateExpiration = (supplyPoint: ISupplyPoint): boolean =>
        dateDiff(addOneMonth(moment()).toISOString(), supplyPoint.expirationDate, 'seconds') < 0
}
