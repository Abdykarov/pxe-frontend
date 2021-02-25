import { CONSTS } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const formFields: IForm = {
    controls: {
        priceVT: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        priceNT: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        priceGas: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
        yearPrice: [
            '',
            [
                CustomValidators.isNumber(CONSTS.VALIDATORS.MAX_DIGIT_AFTER_DECIMAL_POINT_DEFAULT),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT),
            ],
        ],
    },
    validationMessages: {
        priceGas: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        priceNT: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        priceVT: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        yearPrice: {
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint: errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
    },
};
