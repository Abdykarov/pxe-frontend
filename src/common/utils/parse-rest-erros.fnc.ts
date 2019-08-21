import {
    defaultErrorMessage,
    restAPIErrorCodes,
} from 'src/common/constants/errors.constant';
import { IRestAPIError } from 'src/common/containers/form/models/rest-api-error.model';

export const parseRestAPIErrors = (errorObj: IRestAPIError): string => {
    const { error } = errorObj;
    return error && (error.errorCode && restAPIErrorCodes[error.errorCode] || error.message) || defaultErrorMessage;
};
