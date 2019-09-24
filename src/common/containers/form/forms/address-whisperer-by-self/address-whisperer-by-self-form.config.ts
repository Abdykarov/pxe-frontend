import { Validators } from '@angular/forms';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const addressWhispererBySelfFields: IForm = {
    controls: {
        city: [
            '',
            [
                Validators.required,
            ],
        ],
        street: [
            '',
            [
                Validators.required,
            ],
        ],
        descriptiveNumber: [
            '',
            [
                Validators.required,
            ],
        ],
        orientationNumber: [
            '',
            [],
        ],
        region: [
            '',
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
        },
        street: {
            required: errorFieldMessages.street.required,
        },
        orientationNumber: {},
        descriptiveNumber: {
            required: errorFieldMessages.descriptiveNumber.required,
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


