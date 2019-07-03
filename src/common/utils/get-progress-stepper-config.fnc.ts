import * as R from 'ramda';
import * as R_ from 'ramda-extension';

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
        step: SupplyPointState.NONE,
        label: '',
        shadowStep: true,
    },
    {
        step: SupplyPointState.NONE,
        label: '',
        shadowStep: true,
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
    return SupplyPointState.COMPLETED;
};

export const getConfigStepperByState = (activeStep: SupplyPointState): IStepperProgressItem[] => {
    const activeIndex = R.findIndex(R.propEq('step', activeStep))(steps);
    return R_.mapIndexed((item: IStepperProgressItem, index: number) => {
        item.active = index === activeIndex;
        item.done = index < activeIndex;
        return item;
    }, R.clone(steps));
};
