import {
    defaultErrorMessageViolation,
    importErrorViolations,
} from 'src/app/constants/errors.constant';
import { environment } from 'src/environments/environment';

export const parseViolation = (violation: string): string => {
    const errorCodeMessage = violation && importErrorViolations[violation];
    const errorMessage = environment.production
        ? defaultErrorMessageViolation
        : violation;
    return errorCodeMessage || errorMessage;
};
