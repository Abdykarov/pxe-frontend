import { Validators } from '@angular/forms';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const formFields: IForm = {
    controls: {
        commodityType: [
            CommodityType.ELECTRICITY,
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
            null,
            [
                Validators.required,
            ],
        ],
        ean: [
            null,
            [
                Validators.required,
            ],
        ],
        eic: [
            null,
            [
                Validators.required,
            ],
        ],
        address: [
            null,
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
            null,
            [
                Validators.required,
            ],
        ],
        annualConsumptionVT: [
            null,
            [
                Validators.required,
            ],
        ],
        annualConsumption: [
            null,
            [
                Validators.required,
            ],
        ],
        expirationDate: [
            null,
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
        key: CommodityType.ELECTRICITY,
        label: 'elektřina',
    },
    {
        key: CommodityType.GAS,
        label: 'plyn',
    },
];

export const commodityTypeFields = {
    [CommodityType.ELECTRICITY]: ['ean', 'distributionRateId', 'circuitBreakerId', 'annualConsumptionNT', 'annualConsumptionVT'],
    [CommodityType.GAS]: ['eic', 'annualConsumption'],
};
