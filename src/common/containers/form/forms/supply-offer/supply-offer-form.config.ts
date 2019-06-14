import {
    FormArray,
    Validators,
} from '@angular/forms';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import {
    ICommodityTypeFields,
    IForm,
} from 'src/common/containers/form/models/form-definition.model';

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
        annualConsumptionId: {
            required: errorFieldMessages.offerAnnualConsumptionId.required,
        },
        circuitBreakerId: {
            required: errorFieldMessages.offerCircuitBreakerId.required,
        },
        commodityType: {
            required: errorFieldMessages.commodityType.required,
        },
        deliveryFromTo: {
            required: errorFieldMessages.offerDeliveryFromTo.required,
            bsDate: errorFieldMessages.date.formatInterval,
            bsDateMinDate: errorFieldMessages.date.expirationDateInPast,
        },
        deliveryLength: {
            required: errorFieldMessages.offerDeliveryLength.required,
        },
        distributionLocation: {
            required: errorFieldMessages.offerDistributionLocation.required,
        },
        distributionRateId: {
            required: errorFieldMessages.offerDistributionRateId.required,
        },
        name: {
            required: errorFieldMessages.offerName.required,
        },
        permanentPaymentPrice: {
            required: errorFieldMessages.offerPermanentPaymentPrice.required,
            decimal: errorFieldMessages.number.decimal,
            min: errorFieldMessages.number.positive,
        },
        priceGas: {
            required: errorFieldMessages.offerPriceGas.required,
            decimal: errorFieldMessages.number.decimal,
            min: errorFieldMessages.number.positive,
        },
        priceNT: {
            required: errorFieldMessages.offerPriceNT.required,
            decimal: errorFieldMessages.number.decimal,
            min: errorFieldMessages.number.positive,
        },
        priceVT: {
            required: errorFieldMessages.offerPriceVT.required,
            decimal: errorFieldMessages.number.decimal,
            min: errorFieldMessages.number.positive,
        },
        subjectTypeId: {
            required: errorFieldMessages.offerSubjectTypeId.required,
        },
        supplierId: {
            required: errorFieldMessages.supplierId.required,
        },
        validFromTo: {
            required: errorFieldMessages.offerValidFromTo.required,
            bsDate: errorFieldMessages.date.formatInterval,
            bsDateMinDate: errorFieldMessages.date.expirationDateInPast,
        },
    },
};

export const commodityTypeFields: ICommodityTypeFields = {
    [CommodityType.POWER]: ['distributionRateId', 'circuitBreakerId', 'priceNT', 'priceVT'],
    [CommodityType.GAS]: ['priceGas', 'annualConsumptionId'],
};
