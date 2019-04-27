import { Validators } from '@angular/forms';

import { commodityTypes } from './models/supply-point.model';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form-container/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const formFields: IForm = {
    controls: {
        commodityType: [
            commodityTypes.ELECTRICITY,
            [
                Validators.required,
            ],
        ],
        supplierId: [
            null,
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
            null,
            [
                Validators.required,
            ],
        ],
        circuitBreakerId: [
            null,
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
    validationMessages: {
        expirationDate: {
            bsDate: 'Špatný formát data',
        },
    },
};

export const commodityTypeOptions: Array<IOption> = [
    {
        key: commodityTypes.ELECTRICITY,
        label: 'elektřina',
    },
    {
        key: commodityTypes.GAS,
        label: 'plyn',
    },
];

export const commodityTypeFields = {
    [commodityTypes.ELECTRICITY]: ['ean', 'distributionRateId', 'circuitBreakerId', 'annualConsumptionNT', 'annualConsumptionVT'],
    [commodityTypes.GAS]: ['eic', 'annualConsumption'],
};
