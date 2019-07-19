import { Injectable } from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';

import {
    addOneMonth,
    calculateTerminateInterval,
} from 'src/common/utils/supply-point-date-calculate.fnc';
import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { DateDiffPipe } from 'src/common/pipes/date-diff/date-diff.pipe';
import { inArray } from 'src/common/utils';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class ValidityService {
    constructor(
        private dateDiffPipe: DateDiffPipe,
    ) {}

    public validateOffer = (supplyPoint: ISupplyPoint): boolean =>
        R.cond([
            [this.validateOnlyDateExpiration, this.isValidateDateExpiration],
            [this.validateTermWithProlongation, this.isValidateDateProlongation],
            [R.T, this.isValidateDateExpiration],
        ])(supplyPoint)


    public validateTermWithProlongation = (supplyPoint: ISupplyPoint): boolean =>
        supplyPoint.contractEndType.code === CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION

    public validateOnlyDateExpiration = (supplyPoint: ISupplyPoint): boolean =>
        inArray(supplyPoint, [ CONTRACT_END_TYPE.CONTRACT_END_TERM, CONTRACT_END_TYPE.CONTRACT_END_TERMINATE])

    private isValidateDateExpiration = (supplyPoint: ISupplyPoint): boolean =>
        this.dateDiffPipe.transform(addOneMonth(moment()).toISOString(), supplyPoint.expirationDate, 'seconds') < 0

    private isValidateDateProlongation = (supplyPoint: ISupplyPoint): boolean =>
        this.dateDiffPipe.transform(
            addOneMonth(
                calculateTerminateInterval(moment(), supplyPoint),
            ).toISOString(),
            supplyPoint.expirationDate,
            'seconds',
        ) < 0
}
