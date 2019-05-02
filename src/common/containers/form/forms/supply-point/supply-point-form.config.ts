import { Validators } from '@angular/forms';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';
import { IOption } from 'src/common/ui/forms/models/option.model';

export const formFields: IForm = {
    controls: {
        commodityType: [
            CommodityType.POWER,
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
                CustomValidators.ean,
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
                CustomValidators.isDecimal,
            ],
        ],
        annualConsumptionVT: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
            ],
        ],
        annualConsumption: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
            ],
        ],
        expirationDate: [
            null,
        ],
    },
    validationMessages: {
        ean: {
            ean: 'Zadejte správné EAN.',
        },
        annualConsumptionNT: {
            decimal: 'Zadejte číslo.',
        },
        annualConsumptionVT: {
            decimal: 'Zadejte číslo.',
        },
        annualConsumption: {
            decimal: 'Zadejte číslo.',
        },
        expirationDate: {
            bsDate: 'Špatný formát data',
            'expiration-date-in-past': 'Platnost musí končit v budoucnosti',
        },
    },
};

export const codeListTypes = [
    'DSTSAZ',
    'JISTIC',
];

export const commodityTypeOptions: Array<IOption> = [
    {
        key: CommodityType.POWER,
        label: 'elektřina',
    },
    {
        key: CommodityType.GAS,
        label: 'plyn',
    },
];

export const commodityTypeFields = {
    [CommodityType.POWER]: ['ean', 'distributionRateId', 'circuitBreakerId', 'annualConsumptionNT', 'annualConsumptionVT'],
    [CommodityType.GAS]: ['eic', 'annualConsumption'],
};
