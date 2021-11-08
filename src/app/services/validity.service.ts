import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as R from 'ramda';
import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { inArray } from 'src/common/utils';
import {
    addOneMonth,
    addTerminateInterval,
    dateDiff,
} from 'src/common/utils/supply-point-date-calculate.fnc';

@Injectable({
    providedIn: 'root',
})
export class ValidityService {
    public validateOffer = (supplyPoint: ISupplyPoint): boolean =>
        R.cond([
            [this.validateOnlyDateExpiration, this.isValidateDateExpiration],
            [
                this.validateTermWithProlongation,
                this.isValidateDateProlongation,
            ],
            // [R.T, this.isValidateDateExpiration],
            [R.T, R.always(false)],
        ])(supplyPoint);

    public validateOnlyDateExpiration = (supplyPoint: ISupplyPoint): boolean =>
        inArray(
            supplyPoint.contractEndType && supplyPoint.contractEndType.code,
            [
                CONTRACT_END_TYPE.CONTRACT_END_TERM,
                CONTRACT_END_TYPE.CONTRACT_END_TERMINATE,
            ]
        );

    public validateTermWithProlongation = (
        supplyPoint: ISupplyPoint
    ): boolean =>
        supplyPoint.contractEndType &&
        supplyPoint.contractEndType.code ===
            CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION;

    private isValidateDateExpiration = (supplyPoint: ISupplyPoint): boolean =>
        dateDiff(
            addOneMonth(moment()).toISOString(),
            supplyPoint.expirationDate,
            'seconds'
        ) < 0;

    private isValidateDateProlongation = (supplyPoint: ISupplyPoint): boolean =>
        dateDiff(
            addOneMonth(
                addTerminateInterval(moment(), supplyPoint)
            ).toISOString(),
            supplyPoint.expirationDate,
            'seconds'
        ) < 0;
}
