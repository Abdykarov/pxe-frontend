import { Validators } from '@angular/forms';

import { commodityTypes } from './models/supply-point.model';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form-container/models/form-definition.model';

export const formFields: IForm = {
    controls: {
        commodityType: [
            commodityTypes.ELECTRICITY,
            [
                Validators.required,
            ],
        ],
        supplierId: [
            '',
            [
                Validators.required,
            ],
        ],
        name: [
            '',
            [
                Validators.required,
            ],
        ],
        ean: [
            { disabled: false, value: '' },
            [
                Validators.required,
            ],
        ],
        eic: [
            { disabled: true, value: '' },
            [
                Validators.required,
            ],
        ],
        address: [
            '',
            [
                Validators.required,
            ],
        ],
        distributionRateId: [
            '',
            [
                Validators.required,
            ],
        ],
        circuitBreakerId: [
            '',
            [
                Validators.required,
            ],
        ],
        annualConsumptionNT: [
            '',
            [
                Validators.required,
            ],
        ],
        annualConsumptionVT: [
            '',
            [
                Validators.required,
            ],
        ],
        annualConsumption: [
            '',
            [
                Validators.required,
            ],
        ],
        expirationDate: [
            '',
        ],
    },
    validationMessages: {},
};

export const commodityTypeFields = {
    [commodityTypes.ELECTRICITY]: ['ean', 'distributionRateId', 'circuitBreakerId', 'annualConsumptionNT', 'annualConsumptionVT'],
    [commodityTypes.GAS]: ['eic', 'annualConsumption'],
};
