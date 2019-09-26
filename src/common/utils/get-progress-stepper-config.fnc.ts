import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { inArray } from 'src/common/utils/in-array';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

const steps: IStepperProgressItem[] = [
    {
        step: ProgressStatus.SUPPLY_POINT,
        label: 'Odběrné místo',
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

export const indexOfOfferStepWithoutShadowStep = R.pipe(
    R.filter(item => !item.shadowStep),
    R.findIndex(item => item.step === ProgressStatus.OFFER_STEP),
)(steps);

export const indexOfSteps = {
    [ProgressStatus.SUPPLY_POINT]: R.findIndex(R.propEq('step', ProgressStatus.SUPPLY_POINT))(steps),
    [ProgressStatus.OFFER_STEP]: R.findIndex(R.propEq('step', ProgressStatus.OFFER_STEP))(steps),
    [ProgressStatus.PERSONAL_DATA]: R.findIndex(R.propEq('step', ProgressStatus.PERSONAL_DATA))(steps),
    [ProgressStatus.READY_FOR_SIGN]: R.findIndex(R.propEq('step', ProgressStatus.READY_FOR_SIGN))(steps),
    [ProgressStatus.WAITING_FOR_PAYMENT]: R.findIndex(R.propEq('step', ProgressStatus.WAITING_FOR_PAYMENT))(steps),
};

export const indexesOfSecondStep = [
    indexOfSteps[ProgressStatus.OFFER_STEP],
    indexOfSteps[ProgressStatus.PERSONAL_DATA],
    indexOfSteps[ProgressStatus.READY_FOR_SIGN],
    indexOfSteps[ProgressStatus.WAITING_FOR_PAYMENT],
];

export const getConfigStepper = (activeStep: ProgressStatus, withShadowSteps = true): IStepperProgressItem[] => {
    let activeIndex = R.findIndex(R.propEq('step', activeStep))(steps);

    if (!withShadowSteps && inArray(activeIndex, indexesOfSecondStep)) {
        activeIndex = indexOfOfferStepWithoutShadowStep;
    }

    return R.pipe(
        R.filter(item => !item.shadowStep || (item.shadowStep && withShadowSteps)),
        R_.mapIndexed(
            (item: IStepperProgressItem, index: number) => ({
                active: index === activeIndex,
                done: index < activeIndex || activeStep === ProgressStatus.COMPLETED,
                ...item,
            }),
        ),
    )(steps);
};