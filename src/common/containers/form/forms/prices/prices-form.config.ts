import { CONSTS } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const formFields: IForm = {
    controls: {
        importPricePerKwPowerVT: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        importPricePerKwPowerNT: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        importPricePerKwGas: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        importPriceTotalPerYear: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        importPermanentMonthlyPay: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
    },
    validationMessages: {
        importPricePerKwGas: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        importPricePerKwPowerNT: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        importPricePerKwPowerVT: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        importPriceTotalPerYear: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        importPermanentMonthlyPay: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
    },
};
