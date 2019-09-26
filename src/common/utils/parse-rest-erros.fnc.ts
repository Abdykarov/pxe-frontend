import {
    defaultErrorMessage,
    restAPIErrorCodes,
} from 'src/common/constants/errors.constant';
import { environment } from 'src/environments/environment';
import { IRestAPIError } from 'src/common/containers/form/models/rest-api-error.model';

export const parseRestAPIErrors = (errorObj: IRestAPIError): string => {
    const { error } = errorObj;
    const { errorCode, message } = error;
    const errorCodeMessage = errorCode && restAPIErrorCodes[errorCode];
    const errorMessage = environment.production ? defaultErrorMessage : message;

    return errorCodeMessage || errorMessage || defaultErrorMessage;
};
