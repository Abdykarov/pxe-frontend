import { IForm } from 'src/common/containers/form/models/form-definition.model';

import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { requireIfFieldHaveValue } from 'src/common/utils/validators/requireIfFieldHaveValue.fnc';

export const formFieldsBenefit: IForm = {
    controls: {
        name: [
            null,
        ],
        url: [
            null,
            [
                CustomValidators.URL,
            ],
        ],
    },
    options: {
        validator: requireIfFieldHaveValue('name', 'url'),
    },
    validationMessages: {
        name: {
            requireIfFieldHaveValue: errorFieldMessages.benefitName.requireIfFieldHaveValue,
        },
        url: {
            url: errorFieldMessages.benefitName.url,
            requireIfFieldHaveValue: errorFieldMessages.benefitName.requireIfFieldHaveValue,
        },
    },
};
