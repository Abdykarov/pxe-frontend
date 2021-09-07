import { FormGroup } from '@angular/forms';

export const cannotBeNullIfFieldIsFilled = (cannotBeFilledControlName: string, isFilledControlName: string) => {
    return (formGroup: FormGroup) => {
        const cannotBeFilled = formGroup.controls[cannotBeFilledControlName];
        const isFilledControl = formGroup.controls[isFilledControlName];
        const cannotBeValue = cannotBeFilled.value;
        const isFilledValue = isFilledControl.value;

        cannotBeFilled.setErrors(null);
        isFilledControl.setErrors(null);

        if (!isFilledValue && cannotBeValue) {
            cannotBeFilled.setErrors({cannotBeNullIfFieldIsFilled: true});
        }
    };
};
