import { Validators } from '@angular/forms';

import {
    CommodityType,
    DistributionType,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const formFields: IForm = {
    controls: {
        name: [
            null,
            [
                Validators.required,
            ],
        ],
        permanentAddress: [
            null,
            [
                Validators.required,
            ],
        ],
        correspondenceAddress: [
            null,
            [],
        ],
        acountNumber: [
            null,
            [
                Validators.required,
            ],
        ],
        acountBankNumber: [
            null,
            [
                Validators.required,
            ],
        ],
        telephone: [
            null,
            [
                Validators.required,
            ],
        ],
        telephonePrefix: [
            null,
            [
                Validators.required,
            ],
        ],
        email: [
            '',
            [
                Validators.required,
                CustomValidators.email,
            ],
        ],
    },
    validationMessages: {
        name: {},
        address: {},
        permanentAddress: {},
        correspondenceAddress: {},
        acountNumber: {},
        acountBankNumber: {},
        telephone: {},
        telephonePrefix: {},
        email: {},
    },
};
