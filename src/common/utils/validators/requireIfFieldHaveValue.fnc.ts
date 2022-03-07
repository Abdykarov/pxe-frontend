import { FormGroup } from '@angular/forms';

export const requireIfFieldHaveValue = (
    firstControlName: string,
    secondControlName: string
) => {
    return (formGroup: FormGroup) => {
        const firstControl = formGroup.controls[firstControlName];
        const secondControl = formGroup.controls[secondControlName];
        const firstValue = firstControl.value;
        const secondValue = secondControl.value;

        if (!firstValue && !secondValue) {
            firstControl.setErrors(null);
            secondControl.setErrors(null);
        }

        if (firstValue && !secondValue) {
            secondControl.setErrors({
                requireIfFieldHaveValueSecondControl: true,
            });
        }

        if (!firstValue && secondValue) {
            firstControl.setErrors({
                requireIfFieldHaveValueFirstControl: true,
            });
        }
    };
};
