import { FormGroup } from '@angular/forms';

export const fieldsMustMatch = (
    controlName: string,
    matchingControlName: string
) => {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.fieldsMustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ fieldsMustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
};
