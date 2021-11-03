import {ErrorResponse} from '@apollo/client/link/error';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';



import {
    defaultErrorMessage,
    graphQLMessages,
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

const mapGlobalGraphQLErrorMessages = (messages: string[]): string[] =>
    R.map((key: string) => graphQLMessages[key] || defaultErrorMessage, messages);

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
                    globalError = mapGlobalGraphQLErrorMessages(errors.validationError.global);
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
