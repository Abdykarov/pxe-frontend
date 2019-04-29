import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { ErrorResponse } from 'apollo-link-error';

import { IFieldError } from 'src/common/containers/form/models/form-definition.model';

const mapValidationFieldArrayToValidationObj = (array) => {
    const prepareKeys = (val) => R.pipe(
        R.map(key => ({[key]: true})),
        R.mergeAll,
    )(val);
    return R.map(prepareKeys)(array);
};

export const parseGraphQLErrors = (error: ErrorResponse):
    {
        fieldError: IFieldError,
        globalError: string[],
    } => {
        let fieldError: IFieldError = {};
        let globalError: string[] = [];
        const {graphQLErrors, networkError} = error;
        if (!R_.isNilOrEmpty(graphQLErrors)) {
            const errors = R.head(graphQLErrors);
            if (errors.validationError) {
                if (errors.validationError.field) {
                    fieldError = mapValidationFieldArrayToValidationObj(errors.validationError.field);
                }
                if (errors.validationError.global) {
                    globalError = errors.validationError.global;
                }
            } else {
                globalError.push(errors.message);
            }
        }
        if (networkError) {
            globalError.push(networkError.message);
        }
        if (!networkError && !graphQLErrors) {
            globalError.push('Something went wrong!');
        }
        return {
            fieldError,
            globalError,
        };
};
