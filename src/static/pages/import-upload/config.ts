import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

export const stepperProgressConfig: IStepperProgressItem[] = [
    {
        label: 'Nahrání',
        active: true,
        done: true,
    },
    {
        label: 'Kontrola',
        active: true,
        done: false,
    },
    {
        label: 'Schválení',
        active: false,
        done: false,
    },
];
