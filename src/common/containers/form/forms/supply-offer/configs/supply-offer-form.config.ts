import { FormArray, Validators } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { errorFieldMessages } from 'src/app/constants/errors.constant';
import {
    ICommodityTypeFields,
    IForm,
} from 'src/common/containers/form/models/form-definition.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { CustomValidators } from 'src/common/utils';

export const formFields: IForm = {
    controls: {
        id: [null],
        commodityType: [null, [Validators.required]],
        greenEnergy: [false, [Validators.required]],
        subjectTypeId: [null, [Validators.required]],
        name: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.OFFER_NAME),
            ],
        ],
        distributionLocation: [null, [Validators.required]],
        distributionRateId: [null, [Validators.required]],
        circuitBreakerId: [null, [Validators.required]],
        deliveryLength: [null, [Validators.required]],
        annualConsumptionId: [null, [Validators.required]],
        priceNT: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(
                    CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
                ),
                CustomValidators.minValue(0, true),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT
                ),
            ],
        ],
        priceVT: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(
                    CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
                ),
                CustomValidators.minValue(0, true),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT
                ),
            ],
        ],
        priceGas: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(
                    CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
                ),
                CustomValidators.minValue(0, true),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT
                ),
            ],
        ],
        validFromTo: [
            null,
            [Validators.required, CustomValidators.formatIntervalDiff],
        ],
        deliveryFromTo: [
            null,
            [Validators.required, CustomValidators.formatIntervalDiff],
        ],
        permanentPaymentPrice: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(
                    CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT
                ),
                CustomValidators.minValue(0, true),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT
                ),
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
            formatIntervalDiff:
                errorFieldMessages.offerDeliveryFromTo.formatIntervalDiff,
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
            maxlengthRequiredLengthActualLength:
                errorFieldMessages.string.maxlength,
        },
        permanentPaymentPrice: {
            required: errorFieldMessages.offerPermanentPaymentPrice.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        priceGas: {
            required: errorFieldMessages.offerPriceGas.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        priceNT: {
            required: errorFieldMessages.offerPriceNT.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        priceVT: {
            required: errorFieldMessages.offerPriceVT.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
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
            formatIntervalDiff:
                errorFieldMessages.offerValidFromTo.formatIntervalDiff,
        },
    },
};

export const commodityTypeFields: ICommodityTypeFields = {
    [CommodityType.POWER]: [
        'distributionRateId',
        'circuitBreakerId',
        'priceNT',
        'priceVT',
        'greenEnergy',
    ],
    [CommodityType.GAS]: ['priceGas', 'annualConsumptionId'],
};
