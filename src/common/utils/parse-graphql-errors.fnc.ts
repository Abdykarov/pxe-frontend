import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { ErrorResponse } from 'apollo-link-error';

import {
    defaultErrorMessage,
    graphQLMessages,
    graphQLMessagesDynamic,
} from 'src/common/constants/errors.constant';
import { environment } from 'src/environments/environment';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';

const mapValidationFieldArrayToValidationObj = (array) => {
    const prepareKeys = (val) => R.pipe(
        R.map(key => ({[key]: true})),
        R.mergeAll,
    )(val);
    return R.map(prepareKeys)(array);
};

export const mapGlobalGraphQLErrorMessages = (messages: string[], message: string = null): string[] => {
    if (messages && graphQLMessagesDynamic[messages[0]]) {
        return graphQLMessagesDynamic[messages[0]](message);
    }

    return R.map((key: string) => graphQLMessages[key] || defaultErrorMessage, messages);
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
                    globalError = mapGlobalGraphQLErrorMessages(errors.validationError.global, errors.message);
                }
            } else {
                globalError.push(environment.production ? defaultErrorMessage : errors.message);
            }
        }
        if (networkError) {
            globalError.push(networkError.message);
        }
        if (!networkError && !graphQLErrors) {
            globalError.push(defaultErrorMessage);
        }
        return {
            fieldError,
            globalError,
        };
};
