import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { ErrorMessages } from 'src/common/ui/forms/form.constants';
import { IValidationMessages } from '../ui/forms/models/validation-messages.model';
import { createStringFromTemplate } from './create-string-from-template.fnc';

export const getErrorMessage = (
    error: string | object,
    validationMessages: IValidationMessages,
    pipes = null
) => {
    if (R.isNil(error)) {
        return;
    }

    if (R_.isString(error)) {
        return error;
    }

    if (R_.isObject(error)) {
        const errorType = Object.keys(error)[0];
        const errorSubType = Object.keys(error[errorType]).join(' ');
        const errorWithSubType = errorSubType
            ? R_.toCamelCase(`${errorType} ${errorSubType}`)
            : undefined;
        const message =
            (validationMessages &&
                (validationMessages[errorWithSubType] ||
                    validationMessages[errorType])) ||
            ErrorMessages[errorWithSubType] ||
            ErrorMessages[errorType];
        return createStringFromTemplate(
            message || errorWithSubType || errorType,
            error[errorType],
            pipes
        );
    }
};
