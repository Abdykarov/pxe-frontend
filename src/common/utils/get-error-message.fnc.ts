import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { createStringFromTemplate } from './create-string-from-template.fnc';
import { ErrorMessages } from 'src/common/ui/forms/form.constants';
import { IValidationMessages } from '../ui/forms/models/validation-messages.model';

export const getErrorMessage = (error: string | object, validationMessages: IValidationMessages) => {
    if (R.isNil(error)) {
        return;
    }

    if (R_.isString(error)) {
        return error;
    }

    if (R_.isObject(error)) {
        const errorType = Object.keys(error)[0];
        const message = validationMessages && validationMessages[errorType] || ErrorMessages[errorType];
        return createStringFromTemplate(
            message || errorType,
            error[errorType],
        );
    }
};
