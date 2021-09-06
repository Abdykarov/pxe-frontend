import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const supplierProfileFormFields: IForm = {
    controls: {
        numberSeriesPrefix: [
            null,
            [
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.SUPPLIER_PROFILE_SERIES),
            ],
        ],
        numberSeriesVariable: [
            null,
            [
                Validators.required,
                Validators.pattern(`^\\d+$`),
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.SUPPLIER_PROFILE_NUMBER_SERIES),
            ],
        ],
        numberSeriesSuffix: [
            null,
            [
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.SUPPLIER_PROFILE_SERIES),
            ],
        ],
    },
    validationMessages: {
        numberSeriesPrefix: {
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        numberSeriesVariable: {
            required: errorFieldMessages.numericalSeries.required,
            pattern: errorFieldMessages.numberSeriesVariable.pattern,
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
        numberSeriesSuffix: {
            maxlengthRequiredLengthActualLength: errorFieldMessages.string.maxlength,
        },
    },
};
