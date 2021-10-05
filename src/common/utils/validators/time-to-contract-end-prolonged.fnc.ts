import { FormGroup } from '@angular/forms';

import * as R from 'ramda';

import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { expirationDateIsInTerminateInterval } from 'src/common/utils/supply-point-date-calculate.fnc';
import { ISupplyPointInput } from 'src/common/graphql/models/supply.model';

export const isAllRequiredFilled = (supplyPoint: ISupplyPointInput): boolean =>
    !!(supplyPoint.expirationDate && supplyPoint.timeToContractEnd && supplyPoint.timeToContractEndPeriodId);

export const timeToContractEndProlonged = () => {
    return (formGroup: FormGroup) => {
        const supplyPointInput: ISupplyPointInput = formGroup.value;
        const expirationDateControl = formGroup.controls['expirationDate'];
        const currentErrors = expirationDateControl.errors;
        let updatedErrors;

        if (supplyPointInput.contractEndTypeId === CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION &&
            isAllRequiredFilled(supplyPointInput)
        ) {
            if (expirationDateIsInTerminateInterval(supplyPointInput, false)) {
                expirationDateControl.markAsTouched({
                    onlySelf: true,
                });
                updatedErrors = R.assoc('isInProlongInterval', true, currentErrors);
            } else if (expirationDateIsInTerminateInterval(supplyPointInput)) {
                expirationDateControl.markAsTouched({
                    onlySelf: true,
                });
                updatedErrors = R.assoc('isInTerminateInterval', true, currentErrors);
            }
        } else  {
            updatedErrors = R.omit(['isInProlongInterval'], currentErrors);
            updatedErrors = R.omit(['isInTerminateInterval'], currentErrors);
        }

        updatedErrors = R.isEmpty(updatedErrors) ? null : updatedErrors;
        expirationDateControl.setErrors(updatedErrors);
    };
};
