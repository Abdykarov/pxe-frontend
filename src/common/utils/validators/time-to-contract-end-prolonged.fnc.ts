import { FormGroup } from '@angular/forms';

import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { expirationDateIsInTerminateInterval } from 'src/common/utils/supply-point-date-calculate.fnc';
import { ISupplyPointInput } from 'src/common/graphql/models/supply.model';

export const isAllRequiredFilled = (supplyPoint: ISupplyPointInput): boolean =>
    !!(supplyPoint.expirationDate && supplyPoint.timeToContractEnd && supplyPoint.timeToContractEndPeriodId);

export const timeToContractEndProlonge = () => {
    return (formGroup: FormGroup) => {
        const supplyPointInput: ISupplyPointInput = formGroup.getRawValue();
        const expirationDateControl = formGroup.controls['expirationDate'];

        if (supplyPointInput.contractEndTypeId === CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION &&
            isAllRequiredFilled(supplyPointInput) &&
            expirationDateIsInTerminateInterval(supplyPointInput)
        ) {
            expirationDateControl .setErrors({ isInTerminateInterval: true });
        } else  {
            expirationDateControl.setErrors(null);
        }
    };
};
