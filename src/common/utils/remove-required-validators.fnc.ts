import * as R from 'ramda';

export const removeRequiredValidators = (controls) =>
    R.mapObjIndexed((control, field) => {
        const [defaultValue, validators] = control;
        let result = [];
        if (validators) {
            result = R.reject((fc) => fc.prototype.isRequiredValidator)(
                validators
            );
        }
        return [defaultValue, result];
    })(R.clone(controls));
