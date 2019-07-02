import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import {
    ISupplyPoint,
    ProgressStatus,
    StepOfSupplyPoint,
} from 'src/common/graphql/models/supply.model';

const steps: IStepperProgressItem[] = [
    {
        step: StepOfSupplyPoint.CREATE,
        label: 'Výběr odběrného místa',
    },
    {
        step: StepOfSupplyPoint.CHOOSE_OFFER,
        label: 'Výběr nabídky',
    },
    {
        step: StepOfSupplyPoint.PERSONAL_INFO,
        label: 'Rekapitulace',
        shadowStep: true,
    },
    {
        step: StepOfSupplyPoint.CONTRACT,
        label: 'Smlouva',
        shadowStep: true,
    },
    {
        step: StepOfSupplyPoint.PAYMENT,
        label: 'Platba',
        shadowStep: true,
    },
    {
        step: StepOfSupplyPoint.COMPLETED,
        label: 'Podepsání smlouvy',
    },
];


export const getStepOfSupplyPoint = (supplyPoint: ISupplyPoint): StepOfSupplyPoint => {
    if (!supplyPoint) {
        return StepOfSupplyPoint.CREATE;
    }

    if (!supplyPoint.contract) {
        return StepOfSupplyPoint.CHOOSE_OFFER;
    }

    if (supplyPoint.progressStatus === ProgressStatus.OFFER_STEP) {
        return StepOfSupplyPoint.PERSONAL_INFO;
    }

    if (supplyPoint.contract.contractStatus === ProgressStatus.PERSONAL_DATA) {
        return StepOfSupplyPoint.CONTRACT;
    }

    if (supplyPoint.progressStatus === ProgressStatus.WAITING_FOR_PAYMENT) {
        return StepOfSupplyPoint.PAYMENT;
    }

    // ??
    if (supplyPoint.progressStatus === ProgressStatus.SUPPLY_POINT) {
        return StepOfSupplyPoint.COMPLETED;
    }
};

export const getConfigStepper = (activeStep: StepOfSupplyPoint): IStepperProgressItem[] => {
    const activeIndex = R.findIndex(R.propEq('step', activeStep))(steps);
    return R_.mapIndexed((item: IStepperProgressItem, index: number) => {
        item.active = index === activeIndex;
        item.done = index < activeIndex;
        return item;
    }, R.clone(steps));
};
