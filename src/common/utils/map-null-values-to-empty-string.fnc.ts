import * as R from 'ramda';

export const mapNullValuesToEmptyString = <T>(values: T): T =>
    R.map((value) => {
        if (value === null) {
            return '';
        }

        return value;
    })(values);
