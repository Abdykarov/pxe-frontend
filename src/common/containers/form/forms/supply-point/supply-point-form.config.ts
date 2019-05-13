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
                Validators.maxLength(50),
            ],
        ],
        ean: [
            null,
            [
                Validators.required,
                CustomValidators.ean,
                CustomValidators.eanFormat,
            ],
        ],
        eic: [
            null,
            [
                Validators.required,
                CustomValidators.eic,
                CustomValidators.eicFormat,
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
            [
                Validators.required,
            ],
        ],
    },
    validationMessages: {
        commodityType: {
            required: errorFieldMessages.commodityType.required,
        },
        supplierId: {
            required: errorFieldMessages.supplierId.required,
        },
        name: {
            required: errorFieldMessages.name.required,
            maxlength: errorFieldMessages.name.maxlength,
        },
        ean: {
            required: errorFieldMessages.ean.required,
            ean: errorFieldMessages.ean.ean,
            invalidEan: errorFieldMessages.ean.ean,
            eanFormat: errorFieldMessages.ean.ean,
        },
        eic: {
            required: errorFieldMessages.eic.required,
            eic: errorFieldMessages.eic.eic,
            invalidEic: errorFieldMessages.eic.eic,
            eicFormat: errorFieldMessages.eic.eic,
        },
        address: {
            required: errorFieldMessages.address.required,
            invalidAddress: errorFieldMessages.address.invalidAddress,
        },
        distributionRateId: {
            required: errorFieldMessages.distributionRateId.required,
        },
        circuitBreakerId: {
            required: errorFieldMessages.circuitBreakerId.required,
        },
        annualConsumptionNT: {
            required: errorFieldMessages.annualConsumptionNT.required,
            decimal: errorFieldMessages.annualConsumptionNT.annualConsumptionNT,
            negativeAnnualConsumption: errorFieldMessages.annualConsumptionNT.negativeAnnualConsumption,
        },
        annualConsumptionVT: {
            required: errorFieldMessages.annualConsumptionVT.required,
            decimal: errorFieldMessages.annualConsumptionVT.annualConsumptionVT,
            negativeAnnualConsumption: errorFieldMessages.annualConsumptionVT.negativeAnnualConsumption,
        },
        annualConsumption: {
            required: errorFieldMessages.annualConsumption.required,
            decimal: errorFieldMessages.annualConsumption.annualConsumption,
            negativeAnnualConsumption: errorFieldMessages.annualConsumption.negativeAnnualConsumption,
        },
        expirationDateGas: {
            required: errorFieldMessages.expirationDate.requiredGas,
            bsDate: errorFieldMessages.expirationDate.format,
            expirationDateInPast: errorFieldMessages.expirationDate.expirationDateInPast,
        },
        expirationDatePower: {
            required: errorFieldMessages.expirationDate.requiredPower,
            bsDate: errorFieldMessages.expirationDate.format,
            expirationDateInPast: errorFieldMessages.expirationDate.expirationDateInPast,
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
