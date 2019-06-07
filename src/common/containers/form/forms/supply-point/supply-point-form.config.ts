import { Validators } from '@angular/forms';

import {
    CommodityType,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { CONTRACT_END_TYPE } from 'src/app/app.constants';
import { CustomValidators } from 'src/common/utils';
import { errorFieldMessages } from 'src/common/constants/errors.constant';
import { IForm } from 'src/common/containers/form/models/form-definition.model';

export const expirationConfig = {
    [CONTRACT_END_TYPE.CONTRACT_END_TERM]: {
        'expirationDate': true,
        'timeToContractEnd': true,
        'timeToContractEndPeriodId': true,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_TERMINATE]: {
        'expirationDate': false,
        'timeToContractEnd': true,
        'timeToContractEndPeriodId': true,
    },
    [CONTRACT_END_TYPE.CONTRACT_END_INDEFINITE_PERIOD]: {
        'expirationDate': true,
        'timeToContractEnd': true,
        'timeToContractEndPeriodId': true,
    },
};

export const formFields: IForm = {
    controls: {
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
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        annualConsumptionVT: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
                CustomValidators.minValue(0),
            ],
        ],
        annualConsumption: [
            null,
            [
                Validators.required,
                CustomValidators.isDecimal,
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
                Validators.max(99),
                CustomValidators.isPossibleInteger,
            ],
        ],
        timeToContractEndPeriodId: [
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
            decimal: errorFieldMessages.annualConsumptionNT.annualConsumptionNT,
            min: errorFieldMessages.annualConsumptionNT.negativeAnnualConsumption,
            negativeAnnualConsumption: errorFieldMessages.annualConsumptionNT.negativeAnnualConsumption,
        },
        annualConsumptionVT: {
            required: errorFieldMessages.annualConsumptionVT.required,
            decimal: errorFieldMessages.annualConsumptionVT.annualConsumptionVT,
            min: errorFieldMessages.annualConsumptionVT.negativeAnnualConsumption,
            negativeAnnualConsumption: errorFieldMessages.annualConsumptionVT.negativeAnnualConsumption,
        },
        annualConsumption: {
            required: errorFieldMessages.annualConsumption.required,
            decimal: errorFieldMessages.annualConsumption.annualConsumption,
            min: errorFieldMessages.annualConsumption.negativeAnnualConsumption,
            negativeAnnualConsumption: errorFieldMessages.annualConsumption.negativeAnnualConsumption,
        },
        expirationDateGas: {
            required: errorFieldMessages.expirationDate.requiredGas,
            bsDate: errorFieldMessages.expirationDate.format,
            bsDateMinDate: errorFieldMessages.expirationDate.expirationDateInPast,
            expirationDateInPast: errorFieldMessages.expirationDate.expirationDateInPast,
        },
        expirationDatePower: {
            required: errorFieldMessages.expirationDate.requiredPower,
            bsDate: errorFieldMessages.expirationDate.format,
            bsDateMinDate: errorFieldMessages.expirationDate.expirationDateInPast,
            expirationDateInPast: errorFieldMessages.expirationDate.expirationDateInPast,
        },
        contractEndTypeId: {
            required: errorFieldMessages.contractEndTypeId.required,
        },
        timeToContractEnd: {
            required: errorFieldMessages.timeToContractEnd.required,
            max: errorFieldMessages.timeToContractEnd.max,
            isPossibleInteger: errorFieldMessages.timeToContractEnd.isPossibleInteger,
        },
        timeToContractEndPeriodId: {
            required: errorFieldMessages.timeToContractEndPeriodId.required,
        },
    },
};

export const commodityTypeFields = {
    [CommodityType.POWER]: ['ean', 'distributionRateId', 'circuitBreakerId', 'annualConsumptionNT', 'annualConsumptionVT'],
    [CommodityType.GAS]: ['eic', 'annualConsumption'],
};
