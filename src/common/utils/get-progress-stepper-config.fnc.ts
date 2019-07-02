import * as R from 'ramda';
import * as R_ from 'ramda-extension';

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
        shadowStep: true,
    },
    {
        step: ProgressStatus.COMPLETED,
        label: 'Podepsání smlouvy',
    },
];

export const getConfigStepper = (activeStep: ProgressStatus): IStepperProgressItem[] => {
    const activeIndex = R.findIndex(R.propEq('step', activeStep))(steps);
    return R_.mapIndexed((item: IStepperProgressItem, index: number) => {
        item.active = index === activeIndex;
        item.done = index < activeIndex;
        return item;
    }, R.clone(steps));
};
