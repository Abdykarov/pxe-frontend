import { Validators } from '@angular/forms';
import {
    CONSTS,
    CONTRACT_END_TYPE,
    UNIT_OF_PRICES,
} from 'src/app/app.constants';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import {
    ICommodityTypeFields,
    IExpirationConfig,
    IForm,
} from 'src/common/containers/form/models/form-definition.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import {
    CommodityType,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { CustomValidators } from 'src/common/utils';
import { timeToContractEndProlonged } from 'src/common/utils/validators/time-to-contract-end-prolonged.fnc';

export const expirationConfig: IExpirationConfig = {
    [CONTRACT_END_TYPE.CONTRACT_END_TERM]: {
        expirationDate: true,
        timeToContractEnd: false,
        timeToContractEndPeriodId: false,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION]: {
        expirationDate: true,
        timeToContractEnd: true,
        timeToContractEndPeriodId: true,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD]: {
        expirationDate: false,
        timeToContractEnd: true,
        timeToContractEndPeriodId: true,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_TERMINATE]: {
        expirationDate: true,
        timeToContractEnd: false,
        timeToContractEndPeriodId: false,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_DEFAULT]: {
        expirationDate: false,
        timeToContractEnd: false,
        timeToContractEndPeriodId: false,
    },
};

export const formFields = (isTestingUser: boolean): IForm => ({
    controls: {
        id: [null],
        commodityType: [CommodityType.POWER, [Validators.required]],
        withoutSupplier: [false, [Validators.required]],
        subjectTypeId: [
            SubjectType.SUBJECT_TYPE_INDIVIDUAL,
            [Validators.required],
        ],
        supplierId: [null, [Validators.required]],
        name: [
            null,
            [
                Validators.required,
                Validators.maxLength(CONSTS.VALIDATORS.MAX_LENGTH.OFFER_NAME),
            ],
        ],
        ean: [
            null,
            [
                Validators.required,
                isTestingUser
                    ? CustomValidators.alwaysValid
                    : CustomValidators.ean,
                isTestingUser
                    ? CustomValidators.alwaysValid
                    : CustomValidators.eanFormat,
            ],
        ],
        eic: [
            null,
            [
                Validators.required,
                isTestingUser
                    ? CustomValidators.alwaysValid
                    : CustomValidators.eic,
                isTestingUser
                    ? CustomValidators.alwaysValid
                    : CustomValidators.eicFormat,
            ],
        ],
        address: [null, [Validators.required]],
        distributionRateId: [null, [Validators.required]],
        circuitBreakerId: [null, [Validators.required]],
        phasesId: [null, [Validators.required]],
        annualConsumptionNT: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS
                        .MAX_DIGIT_BEFORE_DECIMAL_POINT_ANNUAL_CONSUMPTION
                ),
                CustomValidators.maxValue(
                    CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000,
                    false,
                    true,
                    'maxKWh'
                ),
            ],
        ],
        annualConsumptionNTUnit: [UNIT_OF_PRICES.KWH, [Validators.required]],
        annualConsumptionVT: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(),
                CustomValidators.minValue(0),
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS
                        .MAX_DIGIT_BEFORE_DECIMAL_POINT_ANNUAL_CONSUMPTION
                ),
                CustomValidators.maxValue(
                    CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000,
                    false,
                    true,
                    'maxKWh'
                ),
            ],
        ],
        annualConsumptionVTUnit: [UNIT_OF_PRICES.KWH, [Validators.required]],
        annualConsumptionUnit: [UNIT_OF_PRICES.KWH, [Validators.required]],
        annualConsumption: [
            null,
            [
                Validators.required,
                CustomValidators.totalDigitLengthBeforeDecimalPoint(
                    CONSTS.VALIDATORS.MAX_DIGIT_BEFORE_DECIMAL_POINT_DEFAULT
                ),
                CustomValidators.isNumber(),
                CustomValidators.minValue(0),
                CustomValidators.maxValue(
                    CONSTS.VALIDATORS.MAX_ANNUAL_CONSUMPTION_IN_MWH * 1000,
                    false,
                    true,
                    'maxKWh'
                ),
            ],
        ],
        expirationDate: [null, [Validators.required]],
        contractEndTypeId: [null, [Validators.required]],
        timeToContractEnd: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(),
                CustomValidators.minValue(
                    CONSTS.VALIDATORS.TIME_TO_CONTRACT_END_MIN
                ),
                CustomValidators.maxValue(
                    CONSTS.VALIDATORS.TIME_TO_CONTRACT_END_MAX
                ),
            ],
        ],
        timeToContractEndPeriodId: [null, [Validators.required]],
        ownTerminate: [CONSTS.OWN_TERMINATE_INIT_STATE_OF_SUPPLY_POINT, []],
    },
    options: {
        validator: timeToContractEndProlonged(),
    },
    validationMessages: {
        commodityType: {
            required: errorFieldMessages.commodityType.required,
        },
        subjectTypeId: {
            required: errorFieldMessages.subjectTypeId.required,
        },
        supplierId: {
            required: errorFieldMessages.supplierId.required,
        },
        name: {
            required: errorFieldMessages.name.required,
            maxlength: errorFieldMessages.string.maxlength,
        },
        ean: {
            required: errorFieldMessages.ean.required,
            ean: errorFieldMessages.ean.ean,
            invalidEan: errorFieldMessages.ean.ean,
            pattern: errorFieldMessages.ean.ean,
            invalidEanOnTenthPosition: errorFieldMessages.ean.ean,
            canBeProlongInFuture: errorFieldMessages.ean.canBeProlongInFuture,
            duplicateSupplyPoint: errorFieldMessages.ean.nonUniqueEan,
        },
        eic: {
            required: errorFieldMessages.eic.required,
            eic: errorFieldMessages.eic.eic,
            invalidEic: errorFieldMessages.eic.eic,
            pattern: errorFieldMessages.eic.eic,
            duplicateSupplyPoint: errorFieldMessages.eic.nonUniqueEic,
            canBeProlongInFuture: errorFieldMessages.eic.canBeProlongInFuture,
            invalidEicOnFifthToSeventhPosition: errorFieldMessages.eic.eic,
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
        phasesId: {
            required: errorFieldMessages.phasesId.required,
        },
        annualConsumptionNT: {
            required: errorFieldMessages.annualConsumptionNT.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            negativeAnnualConsumption: errorFieldMessages.number.positive,
            number: errorFieldMessages.number.positiveInteger,
            maxKWh: errorFieldMessages.annualConsumption.maxKWh,
            maxMWh: errorFieldMessages.annualConsumption.maxMWh,
            'annual-consumption-must-be-positive-number':
                errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        annualConsumptionVT: {
            required: errorFieldMessages.annualConsumptionVT.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            maxKWh: errorFieldMessages.annualConsumption.maxKWh,
            maxMWh: errorFieldMessages.annualConsumption.maxMWh,
            number: errorFieldMessages.number.positiveInteger,
            negativeAnnualConsumption: errorFieldMessages.number.positive,
            'annual-consumption-must-be-positive-number':
                errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        annualConsumption: {
            required: errorFieldMessages.annualConsumption.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            negativeAnnualConsumption: errorFieldMessages.number.positive,
            maxKWh: errorFieldMessages.annualConsumption.maxKWh,
            maxMWh: errorFieldMessages.annualConsumption.maxMWh,
            number: errorFieldMessages.number.positiveInteger,
            'annual-consumption-must-be-positive-number':
                errorFieldMessages.number.positive,
            totalDigitLengthBeforeDecimalPoint:
                errorFieldMessages.number.totalDigitLengthBeforeDecimalPoint,
        },
        expirationDateGas: {
            required: errorFieldMessages.expirationDate.requiredGas,
            bsDate: errorFieldMessages.date.format,
            bsDateMinDate:
                errorFieldMessages.expirationDate
                    .expirationAtLeast30DaysBeforeNewDelivery,
            expirationDateInPast: errorFieldMessages.date.expirationDateInPast,
            isInTerminateInterval:
                errorFieldMessages.expirationDate.isInTerminateInterval,
            isInProlongInterval:
                errorFieldMessages.expirationDate.isInProlongInterval,
            expirationAtLeast30DaysBeforeNewDelivery:
                errorFieldMessages.expirationDate
                    .expirationAtLeast30DaysBeforeNewDelivery,
            notEnoughDaysToProcessContract:
                errorFieldMessages.expirationDate
                    .notEnoughDaysToProcessContract,
        },
        expirationDatePower: {
            required: errorFieldMessages.expirationDate.requiredPower,
            bsDate: errorFieldMessages.date.format,
            bsDateMinDate:
                errorFieldMessages.expirationDate
                    .expirationAtLeast30DaysBeforeNewDelivery,
            expirationDateInPast: errorFieldMessages.date.expirationDateInPast,
            isInTerminateInterval:
                errorFieldMessages.expirationDate.isInTerminateInterval,
            isInProlongInterval:
                errorFieldMessages.expirationDate.isInProlongInterval,
            expirationAtLeast30DaysBeforeNewDelivery:
                errorFieldMessages.expirationDate
                    .expirationAtLeast30DaysBeforeNewDelivery,
            notEnoughDaysToProcessContract:
                errorFieldMessages.expirationDate
                    .notEnoughDaysToProcessContract,
        },
        contractEndTypeId: {
            required: errorFieldMessages.contractEndTypeId.required,
        },
        timeToContractEnd: {
            required: errorFieldMessages.timeToContractEnd.required,
            max: errorFieldMessages.timeToContractEnd.max,
            min: errorFieldMessages.number.positive,
            number: errorFieldMessages.number.positiveInteger,
        },
        timeToContractEndPeriodId: {
            required: errorFieldMessages.timeToContractEndPeriodId.required,
        },
    },
});

export const supplyPointDetailAllowedFields: ICommodityTypeFields = {
    [CommodityType.POWER]: [
        'id',
        'commodityType',
        'name',
        'annualConsumptionNT',
        'annualConsumptionVT',
        'annualConsumptionNTUnit',
        'annualConsumptionVTUnit',
    ],
    [CommodityType.GAS]: [
        'id',
        'commodityType',
        'name',
        'annualConsumption',
        'annualConsumptionUnit',
    ],
};

export const supplyPointAllowedFields: ICommodityTypeFields = {
    [CommodityType.POWER]: [
        'id',
        'commodityType',
        'subjectTypeId',
        'supplierId',
        'name',
        'ean',
        'address',
        'distributionRateId',
        'circuitBreakerId',
        'phasesId',
        'annualConsumptionNT',
        'annualConsumptionVT',
        'annualConsumptionNTUnit',
        'annualConsumptionVTUnit',
        'expirationDate',
        'contractEndTypeId',
        'timeToContractEnd',
        'timeToContractEndPeriodId',
        'ownTerminate',
    ],
    [CommodityType.GAS]: [
        'id',
        'commodityType',
        'subjectTypeId',
        'supplierId',
        'name',
        'eic',
        'address',
        'annualConsumption',
        'annualConsumptionUnit',
        'expirationDate',
        'contractEndTypeId',
        'timeToContractEnd',
        'timeToContractEndPeriodId',
        'ownTerminate',
    ],
};

export const confirmFindNewSupplyPoint = 'confirmFindNewSupplyPoint';

export const confirmFindNewSupplyPointConfig = (data): IShowModal => {
    return {
        component: 'ConfirmModalComponent',
        modalType: confirmFindNewSupplyPoint,
        instanceData: {
            confirmText: `Pokračováním ztratíte neuložené změny ve formuláři`,
            data,
        },
    };
};

export const confirmSaveSupplyPoint = 'confirmSaveSupplyPoint';

export const confirmConfirmSaveSupplyPointConfig = (): IShowModal => {
    return {
        component: 'ConfirmModalComponent',
        modalType: confirmSaveSupplyPoint,
        instanceData: {
            confirmText: `Opravdu chcete změny uložit?`,
            titleConfirm: 'Uložit',
            titleClose: 'Zrušit',
        },
    };
};
