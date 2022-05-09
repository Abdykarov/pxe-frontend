import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { CustomValidators } from 'src/common/utils';

export const addressNotFoundFields: IForm = {
    controls: {
        city: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.CITY),
            ],
        ],
        street: [
            '',
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.STREET),
            ],
        ],
        descriptiveNumber: [
            '',
            [
                Validators.required,
                Validators.maxLength(
                    CONSTS.VALIDATORS.MAX_LENGTH.DESCRIPTIVE_NUMBER
                ),
            ],
        ],
        orientationNumber: [
            '',
            [
                Validators.maxLength(
                    CONSTS.VALIDATORS.MAX_LENGTH.ORIENTATION_NUMBER
                ),
            ],
        ],
        region: [null, [Validators.required]],
        postCode: ['', [Validators.required, CustomValidators.postCode]],
    },
    validationMessages: {
        city: {
            required: errorFieldMessages.city.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        street: {
            required: errorFieldMessages.street.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        orientationNumber: {
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        descriptiveNumber: {
            required: errorFieldMessages.descriptiveNumber.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
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
