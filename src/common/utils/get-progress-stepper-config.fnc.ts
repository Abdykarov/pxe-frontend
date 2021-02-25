import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { inArray } from 'src/common/utils/in-array';
import { ImportProgressStep } from 'src/app/pages/suppliers/import/import.model';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { ProgressStatus } from 'src/common/graphql/models/supply.model';

const getStatusIndex = (status: string, steps: IStepperProgressItem[]) =>
    R.findIndex(R.propEq('step', status))(steps);

export enum TypeStepper {
    IMPORT,
    REQUEST,
    CREATE_USER,
}

const stepsCreateUser: IStepperProgressItem[] = [
    {
        step: ProgressStatus.SUPPLY_POINT,
        label: 'Odběrné místo',
    },
    {
        step: ProgressStatus.PERSONAL_DATA,
        label: 'Osobní informace',
    },
    {
        step: ProgressStatus.PRICES,
        label: 'Cena',
    },
];

const stepsImport: IStepperProgressItem[] = [
    {
        step: ImportProgressStep.UPLOAD,
        label: 'Nahrání',
    },
    {
        step: ImportProgressStep.REUPLOAD,
        label: 'Kontrola',
    },
    {
        step: ImportProgressStep.APPROVAL,
        label: 'Schválení',
    },
];

const stepsRequests: IStepperProgressItem[] = [
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
)(stepsRequests);

export const indexOfSteps = {
    [ProgressStatus.SUPPLY_POINT]: getStatusIndex(ProgressStatus.SUPPLY_POINT, stepsRequests),
    [ProgressStatus.OFFER_STEP]: getStatusIndex(ProgressStatus.OFFER_STEP, stepsRequests),
    [ProgressStatus.PERSONAL_DATA]: getStatusIndex(ProgressStatus.PERSONAL_DATA, stepsRequests),
    [ProgressStatus.READY_FOR_SIGN]: getStatusIndex(ProgressStatus.READY_FOR_SIGN, stepsRequests),
    [ProgressStatus.WAITING_FOR_PAYMENT]: getStatusIndex(ProgressStatus.WAITING_FOR_PAYMENT, stepsRequests),
};

export const indexesOfSecondStep = [
    indexOfSteps[ProgressStatus.OFFER_STEP],
    indexOfSteps[ProgressStatus.PERSONAL_DATA],
    indexOfSteps[ProgressStatus.READY_FOR_SIGN],
    indexOfSteps[ProgressStatus.WAITING_FOR_PAYMENT],
];

const stepsMapping = {
    [TypeStepper.REQUEST]: stepsRequests,
    [TypeStepper.IMPORT]: stepsImport,
    [TypeStepper.CREATE_USER]: stepsCreateUser,
};

const getSteps = (typeStepper: TypeStepper): IStepperProgressItem[] => stepsMapping[typeStepper];

export const getConfigStepper = (
    activeStep: ProgressStatus | ImportProgressStep,
    withShadowSteps = true,
    typeStepper: TypeStepper = TypeStepper.REQUEST,
): IStepperProgressItem[] => {
    let activeIndex = R.findIndex(R.propEq('step', activeStep))(getSteps(typeStepper));

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
    )(getSteps(typeStepper));
};
