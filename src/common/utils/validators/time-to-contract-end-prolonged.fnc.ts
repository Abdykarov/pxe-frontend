import { FormGroup } from '@angular/forms';

import * as moment from 'moment';

import { calculateTerminateInterval } from 'src/common/utils/supply-point-date-calculate.fnc';
import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { ISupplyPointInput } from 'src/common/graphql/models/supply.model';

export const timeToContractEndProlonge = () => {
    return (formGroup: FormGroup) => {
        const supplyPointInput: ISupplyPointInput = formGroup.getRawValue();
        const expirationDateControl = formGroup.controls['expirationDate'];

        if (supplyPointInput.contractEndTypeId === CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION
            && isAllRequiredFilled(supplyPointInput) &&
            !isInTerminateInterval(supplyPointInput)
        ) {
            expirationDateControl .setErrors({ isInTerminateInterval: true });
        } else  {
            expirationDateControl.setErrors(null);
        }
    };
};

export const isAllRequiredFilled = (supplyPoint: ISupplyPointInput): boolean =>
    !!(supplyPoint.expirationDate && supplyPoint.timeToContractEnd && supplyPoint.timeToContractEndPeriodId);

export const isInTerminateInterval = (supplyPoint: ISupplyPointInput): boolean =>
    calculateTerminateInterval(moment(), supplyPoint).diff(moment(supplyPoint.expirationDate).startOf('day'), 'seconds') <= 0;
