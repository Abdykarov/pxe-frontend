import { Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { CustomValidators } from 'src/common/utils';
import { requireIfFieldHaveValue } from 'src/common/utils/validators/requireIfFieldHaveValue.fnc';

export const formFieldsBenefit: IForm = {
    controls: {
        name: [
            null,
            Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_NAME),
        ],
        url: [
            null,
            [
                CustomValidators.URL,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.BENEFIT_URL),
            ],
        ],
    },
    options: {
        validator: requireIfFieldHaveValue('name', 'url'),
    },
    validationMessages: {
        name: {
            requireIfFieldHaveValueFirstControl:
                errorFieldMessages.benefitName.required,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        url: {
            requireIfFieldHaveValueSecondControl:
                errorFieldMessages.benefitUrl.url,
            url: errorFieldMessages.benefitUrl.url,
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
    },
};
