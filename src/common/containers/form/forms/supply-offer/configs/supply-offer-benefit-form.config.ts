import { Validators } from '@angular/forms';

import { CONSTS } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { requireIfFieldHaveValue } from 'src/common/utils/validators/requireIfFieldHaveValue.fnc';

export const formFieldsBenefit: IForm = {
    controls: {
        name: [
            null,
            Validators.maxLength(CONSTS.MAX_LENGTH_BENEFIT_NAME),
        ],
        url: [
            null,
            [
                CustomValidators.URL,
                Validators.maxLength(CONSTS.MAX_LENGTH_BENEFIT_URL),
            ],
        ],
    },
    options: {
        validator: requireIfFieldHaveValue('name', 'url'),
    },
    validationMessages: {
        name: {
            requireIfFieldHaveValueFirstControl: errorFieldMessages.benefitName.required,
            maxlengthRequiredLengthActualLength: errorFieldMessages.benefitName.maxlength,
        },
        url: {
            requireIfFieldHaveValueSecondControl: errorFieldMessages.benefitUrl.url,
            url: errorFieldMessages.benefitUrl.url,
            maxlengthRequiredLengthActualLength: errorFieldMessages.benefitUrl.maxlength,
        },
    },
};
