import { Validators } from '@angular/forms';
import * as R from 'ramda';

export const removeRequiredValidators = (controls) =>
    R.mapObjIndexed((control, field) => {
        const [defaultValue, validators] = control;
        let result = [];
        if (validators) {
            result = R.reject((fc) => fc.name === Validators.required.name)(
                validators
            );
        }
        return [defaultValue, result];
    })(R.clone(controls));
