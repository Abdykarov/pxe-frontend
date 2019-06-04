import {
    FormArray,
    Validators,
} from '@angular/forms';

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
        id: [
            null,
        ],
        commodityType: [
            null,
            [
                Validators.required,
            ],
        ],
        subjectTypeId: [
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
        distributionLocation: [
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
        deliveryLength: [
            null,
            [
                Validators.required,
            ],
        ],
        annualConsumptionId: [
            null,
            [
                Validators.required,
            ],
        ],
        priceNT: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        priceVT: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        priceGas: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        validFromTo: [
            null,
            [
                Validators.required,
            ],
        ],
        deliveryFromTo: [
            null,
            [
                Validators.required,
            ],
        ],
        permanentPaymentPrice: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        benefits: new FormArray([]),
    },
    validationMessages: {
        circuitBreakerId: {
            required: errorFieldMessages.circuitBreakerId.required,
        },
        commodityType: {
            required: errorFieldMessages.commodityType.required,
        },
        distributionRateId: {
            required: errorFieldMessages.distributionRateId.required,
        },
        name: {
            required: errorFieldMessages.name.required,
            maxlength: errorFieldMessages.name.maxlength,
        },
        subjectTypeId: {
            required: errorFieldMessages.subjectTypeId.required,
        },
        supplierId: {
            required: errorFieldMessages.supplierId.required,
        },
    },
};

export const CODE_LIST_TYPE_DIST_RATE_INDIVIDUAL = 'DSTSA2';
export const CODE_LIST_TYPE_DIST_RATE_BOTH = 'DSTSAZ';
export const CODE_LIST_TYPE_DIST_RATE_BUSINESSMAN = 'DSTSA1';
export const CODE_LIST_TYPE_CIRCUIT_BREAKER = 'JISTIC';

export const CODE_LIST_TYPE_SUBJECT = 'TPSB';
export const CODE_LIST_TYPE_COMMODITY = 'COMO';
export const CODE_LIST_TYPE_CONSUMPTION = 'CGAS';
export const CODE_LIST_TYPE_DISTRIBUTION_POWER = 'PDISTR';
export const CODE_LIST_TYPE_DISTRIBUTION_GAS = 'GDISTR';

export const codeListTypes = [
    CODE_LIST_TYPE_DIST_RATE_BOTH,
    CODE_LIST_TYPE_DIST_RATE_BUSINESSMAN,
    CODE_LIST_TYPE_DIST_RATE_INDIVIDUAL,
    CODE_LIST_TYPE_CIRCUIT_BREAKER,
    CODE_LIST_TYPE_SUBJECT,
    CODE_LIST_TYPE_COMMODITY,
    CODE_LIST_TYPE_CONSUMPTION,
    CODE_LIST_TYPE_DISTRIBUTION_POWER,
    CODE_LIST_TYPE_DISTRIBUTION_GAS,
];

export const subjectTypeOptions: Array<IOption> = [
    {
        key: SubjectType.SUBJECT_TYPE_INDIVIDUAL,
        label: 'Domácnost',
    },
    {
        key: SubjectType.SUBJECT_TYPE_BUSINESSMAN,
        label: 'Firma',
    },
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

export const deliveryLengthOptions: Array<IOption> = [
    {
        key: 1,
        label: '1 rok',
    },
    {
        key: 2,
        label: '2 roky',
    },
];

export const commodityTypeFields = {
    [CommodityType.POWER]: ['distributionRateId', 'circuitBreakerId', 'priceNT', 'priceVT'],
    [CommodityType.GAS]: ['priceGas', 'annualConsumptionId'],
};

export const distributionRatesTypeDefinition = {
    [DistributionType.VT] : [
        'C01d', 'C02d', 'C03d', 'C60d', 'C61d', 'C62d', 'D01d', 'D02d',
    ],
    [DistributionType.BOTH] : [
        'C25d', 'C26d', 'C27d', 'C35d', 'C45d', 'C46d', 'C55d', 'C56d',
        'D25d', 'D26d', 'D27d', 'D35d', 'D45d', 'D56d', 'D57d', 'D61d',
    ],
};

export const SUBJECT_TYPE_TO_DIST_RATE = {
    [SubjectType.SUBJECT_TYPE_INDIVIDUAL]: CODE_LIST_TYPE_DIST_RATE_INDIVIDUAL,
    [SubjectType.SUBJECT_TYPE_BUSINESSMAN]: CODE_LIST_TYPE_DIST_RATE_BUSINESSMAN,
};


export const COMMODITY_TO_DISTRIBUTION = {
    [CommodityType.POWER]: CODE_LIST_TYPE_DISTRIBUTION_POWER,
    [CommodityType.GAS]: CODE_LIST_TYPE_DISTRIBUTION_GAS,
};
