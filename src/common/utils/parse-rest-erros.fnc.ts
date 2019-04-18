import {
    defaultRestAPIErrorMessage,
    restAPIErrorCodes,
} from '../constants/errors.constant';
import { IRestAPIError } from 'src/common/containers/form-container/models/rest-api-error.model';

export const parseRestAPIErrors = (errorObj: IRestAPIError): string => {
    const { error } = errorObj;
    const message = error && error.errorCode && restAPIErrorCodes[error.errorCode] || defaultRestAPIErrorMessage;
    return message;
};
