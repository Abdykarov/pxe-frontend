import * as R from 'ramda';

import { ContractStatus } from 'src/common/graphql/models/contract';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import {
    ISupplyPoint,
    SupplyPointState,
} from 'src/common/graphql/models/supply.model';

const steps: IStepperProgressItem[] = [
    {
        step: SupplyPointState.CREATE,
        label: 'Výběr odběrného místa',
    },
    {
        step: SupplyPointState.CHOOSE_OFFER,
        label: 'Výběr nabídky',
    },
    {
        step: SupplyPointState.PERSONAL_INFO,
        label: 'Rekapitulace',
        shadowStep: true,
    },
    {
        step: SupplyPointState.CONTRACT,
        label: 'Smlouva',
        shadowStep: true,
    },
    {
        step: SupplyPointState.PAYMENT,
        label: 'Platba',
        shadowStep: true,
    },
    {
        step: SupplyPointState.COMPLETED,
        label: 'Podepsání smlouvy',
    },
];


export const getSupplyPointState = (supplyPoint: ISupplyPoint): SupplyPointState => {
    if (!supplyPoint.contract) {
        return SupplyPointState.CREATE;
    }

    if (!supplyPoint.contract.offer) {
        return SupplyPointState.CHOOSE_OFFER;
    }

    if (!supplyPoint.contract.personalData) {
        return SupplyPointState.PERSONAL_INFO;
    }

    if (supplyPoint.contract.contractStatus === ContractStatus.CONCLUDED) {
        return SupplyPointState.CONTRACT;
    }

    // todo platba
    return SupplyPointState.CONTRACT;
};

export const getConfigStepperByStatus = (activeStep: SupplyPointState): IStepperProgressItem[] => {
    let wasFoundItem = false;
    return R.map((item: IStepperProgressItem) => {
        if ( item.step !== activeStep && !wasFoundItem) {
            item.done = true;
            return item;
        }

        if ( item.step === activeStep && !wasFoundItem) {
            item.done = false;
            item.active = true;
            wasFoundItem = true;
            return item;
        }

        item.done = false;
        return item;
    }, R.mergeDeepLeft({}, steps));
};
