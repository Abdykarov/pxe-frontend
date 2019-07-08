import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { inArray } from 'src/common/utils/in-array';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

const steps: IStepperProgressItem[] = [
    {
        step: ProgressStatus.SUPPLY_POINT,
        label: 'Výběr odběrného místa',

    },
    {
        step: ProgressStatus.NONE,
        label: '',
        shadowStep: true,
    },
    {
        step: ProgressStatus.NONE,
        label: '',
        shadowStep: true,
    },
    {
        step: ProgressStatus.OFFER_STEP,
        label: 'Výběr nabídky',
    },
    {
        step: ProgressStatus.PERSONAL_DATA,
        label: 'Rekapitulace',
        shadowStep: true,
    },
    {
        step: ProgressStatus.READY_FOR_SIGN,
        label: 'Smlouva',
        shadowStep: true,
    },
    {
        step: ProgressStatus.WAITING_FOR_PAYMENT,
        label: 'Platba',
    },
];

export const offerStepWithoutShadowSteps = R.pipe(
    R.filter(item => !item.shadowStep),
    R.findIndex(item => item.step === ProgressStatus.OFFER_STEP),
)(steps);

export const offersStepsIndexes = [
    R.findIndex(R.propEq('step', ProgressStatus.OFFER_STEP))(steps),
    R.findIndex(R.propEq('step', ProgressStatus.PERSONAL_DATA))(steps),
    R.findIndex(R.propEq('step', ProgressStatus.READY_FOR_SIGN))(steps),
    R.findIndex(R.propEq('step', ProgressStatus.WAITING_FOR_PAYMENT))(steps),
];

export const getConfigStepper = (activeStep: ProgressStatus, withShadowSteps = true): IStepperProgressItem[] => {
    let activeIndex = R.findIndex(R.propEq('step', activeStep))(steps);

    if ( !withShadowSteps && inArray(activeIndex, offersStepsIndexes)) {
        activeIndex = offerStepWithoutShadowSteps;
    }

    return R.pipe(
        R.filter(item => !item.shadowStep && !withShadowSteps),
        R_.mapIndexed((item: IStepperProgressItem, index: number) => {
            const itemResult: any = {};
            itemResult.active = index === activeIndex;
            itemResult.done = index < activeIndex || activeStep === ProgressStatus.COMPLETED;
            return itemResult;
        }),
    )(steps);
};
