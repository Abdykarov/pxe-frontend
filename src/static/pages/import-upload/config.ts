import { FileUploader } from 'ng2-file-upload';

import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';

export const stepperProgressConfig: IStepperProgressItem[] = [
    {
        label: 'Nahrání',
        active: true,
        done: false,
    },
    {
        label: 'Kontrola',
        active: false,
        done: false,
    },
    {
        label: 'Schválení',
        active: false,
        done: false,
    },
];

export const fileUploader = new FileUploader({
    url: 'none',
});
