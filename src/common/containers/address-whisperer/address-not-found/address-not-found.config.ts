import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { CONSTS } from 'src/app/app.constants';

export const addressNotFoundFields: IForm = {
    controls: {
        city: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_CITY),
            ],
        ],
        street: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_STREET),
            ],
        ],
        descriptiveNumber: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.MAX_LENGTH_DESCRIPTIVE_NUMBER),
            ],
        ],
        orientationNumber: [
            '',
            [
                Validators.maxLength(CONSTS.MAX_LENGTH_ORIENTATION_NUMBERR),
            ],
        ],
        region: [
            null,
            [
                Validators.required,
            ],
        ],
        postCode: [
            '',
            [
                Validators.required,
                CustomValidators.postCode,
            ],
        ],

    },
    validationMessages: {
        city: {
            required: errorFieldMessages.city.required,
            maxlengthRequiredLengthActualLength: errorFieldMessages.city.maxlengthCity,
        },
        street: {
            required: errorFieldMessages.street.required,
            maxlengthRequiredLengthActualLength: errorFieldMessages.street.maxlengthStreet,
        },
        orientationNumber: {
            maxlengthRequiredLengthActualLength: errorFieldMessages.orientationNumber.maxlengthOrientationNumber,
        },
        descriptiveNumber: {
            required: errorFieldMessages.descriptiveNumber.required,
            maxlengthRequiredLengthActualLength: errorFieldMessages.descriptiveNumber.maxlengthDescriptiveNumber,
        },
        region: {
            required: errorFieldMessages.region.required,
        },
        postCode: {
            required: errorFieldMessages.postCode.required,
            postCode: errorFieldMessages.postCode.pattern,
        },
    },
};


