import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const supplierProfileFormFields: IForm = {
    controls: {
        email: [
            null,
            [
                Validators.required,
                Validators.email,
            ],
        ],
        companyName: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.COMPANY_NAME),
            ],
        ],
        numericalSeriesPrefix: [
            null,
            [
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.COMPANY_NAME),
            ],
        ],
        numericalSeries: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.COMPANY_NAME),
            ],
        ],
        numericalSeriesSufix: [
            null,
            [
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.COMPANY_NAME),
            ],
        ],
    },
    validationMessages: {
        email: {
            required: errorFieldMessages.email.required,
            email: errorFieldMessages.email.email,
            invalidEmail: errorFieldMessages.email.email,
        },
        companyName: {
            required: errorFieldMessages.fullName.requiredPersonLastName,
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        numericalSeriesPrefix: {
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        numericalSeries: {
            required: errorFieldMessages.numericalSeries.required,
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        numericalSeriesSufix: {
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
    },
};
