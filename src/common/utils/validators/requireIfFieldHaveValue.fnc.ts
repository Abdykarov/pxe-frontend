import {
    FormGroup,
    ValidationErrors,
} from '@angular/forms';

export const requireIfFieldHaveValue = (firstControlName: string, secondControlName: string) => {
    return (formGroup: FormGroup) => {
        const firstControl = formGroup.controls[firstControlName];
        const secondControl = formGroup.controls[secondControlName];
        const firstValue = firstControl.value;
        const secondValue = secondControl.value;

        if (firstValue && !secondValue) {
            secondControl.setErrors({requireIfFieldHaveValue: true});
        }

        if (!firstValue && secondValue) {
            firstControl.setErrors({requireIfFieldHaveValue: true});
        }
    };
};
