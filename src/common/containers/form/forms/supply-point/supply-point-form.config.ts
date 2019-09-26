import { Validators } from '@angular/forms';

import {
    CommodityType,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import {
    CONSTS,
    CONTRACT_END_TYPE,
} from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import {
    ICommodityTypeFields,
    IExpirationConfig,
    IForm,
} from 'src/common/containers/form/models/form-definition.model';
import { IShowModal } from 'src/common/containers/modal/modals/model/modal.model';
import { timeToContractEndProlonged } from 'src/common/utils/validators/time-to-contract-end-prolonged.fnc';

export const expirationConfig: IExpirationConfig = {
    [CONTRACT_END_TYPE.CONTRACT_END_TERM]: {
        'expirationDate': true,
        'timeToContractEnd': false,
        'timeToContractEndPeriodId': false,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_TERM_WITH_PROLONGATION]: {
        'expirationDate': true,
        'timeToContractEnd': true,
        'timeToContractEndPeriodId': true,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD]: {
        'expirationDate': false,
        'timeToContractEnd': true,
        'timeToContractEndPeriodId': true,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_TERMINATE]: {
        'expirationDate': true,
        'timeToContractEnd': false,
        'timeToContractEndPeriodId': false,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_DEFAULT]: {
        'expirationDate': false,
        'timeToContractEnd': false,
        'timeToContractEndPeriodId': false,
    },
};

export const formFields: IForm = {
    controls: {
        id: [
            null,
        ],
        commodityType: [
            CommodityType.POWER,
            [
                Validators.required,
            ],
        ],
        subjectTypeId: [
            SubjectType.SUBJECT_TYPE_INDIVIDUAL,
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
        phasesId: [
            null,
            [
                Validators.required,
            ],
        ],
        annualConsumptionNT: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(2),
                CustomValidators.minValue(0),
            ],
        ],
        annualConsumptionVT: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(2),
                CustomValidators.minValue(0),
            ],
        ],
        annualConsumption: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(2),
                CustomValidators.minValue(0),
            ],
        ],
        expirationDate: [
            null,
            [
                Validators.required,
            ],
        ],
        contractEndTypeId: [
            null,
            [
                Validators.required,
            ],
        ],
        timeToContractEnd: [
            null,
            [
                Validators.required,
                CustomValidators.isNumber(),
                CustomValidators.minValue(0),
                CustomValidators.maxValue(100),
            ],
        ],
        timeToContractEndPeriodId: [
            null,
            [
                Validators.required,
            ],
        ],
        ownTerminate: [
            CONSTS.OWN_TERMINATE_INIT_STATE_OF_SUPPLY_POINT,
            [],
        ],
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
        phasesId: {
            required: errorFieldMessages.phasesId.required,
        },
        annualConsumptionNT: {
            required: errorFieldMessages.annualConsumptionNT.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            negativeAnnualConsumption: errorFieldMessages.number.positive,
            'annual-consumption-must-be-positive-number': errorFieldMessages.number.positive,
        },
        annualConsumptionVT: {
            required: errorFieldMessages.annualConsumptionVT.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            negativeAnnualConsumption: errorFieldMessages.number.positive,
            'annual-consumption-must-be-positive-number': errorFieldMessages.number.positive,
        },
        annualConsumption: {
            required: errorFieldMessages.annualConsumption.required,
            decimal: errorFieldMessages.number.decimal,
            decimalCountActual: errorFieldMessages.number.decimalCount,
            min: errorFieldMessages.number.positive,
            negativeAnnualConsumption: errorFieldMessages.number.positive,
            'annual-consumption-must-be-positive-number': errorFieldMessages.number.positive,
        },
        expirationDateGas: {
            required: errorFieldMessages.expirationDate.requiredGas,
            bsDate: errorFieldMessages.date.format,
            bsDateMinDate: errorFieldMessages.date.expirationDateInPast,
            expirationDateInPast: errorFieldMessages.date.expirationDateInPast,
            isInTerminateInterval: errorFieldMessages.expirationDate.isInTerminateInterval,
        },
        expirationDatePower: {
            required: errorFieldMessages.expirationDate.requiredPower,
            bsDate: errorFieldMessages.date.format,
            bsDateMinDate: errorFieldMessages.date.expirationDateInPast,
            expirationDateInPast: errorFieldMessages.date.expirationDateInPast,
            isInTerminateInterval: errorFieldMessages.expirationDate.isInTerminateInterval,
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
};

export const supplyPointDetailAllowedFields: ICommodityTypeFields = {
    [CommodityType.POWER]: [
        'id',
        'commodityType',
        'name',
        'annualConsumptionNT',
        'annualConsumptionVT',
    ],
    [CommodityType.GAS]: [
        'id',
        'commodityType',
        'name',
        'annualConsumption',
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