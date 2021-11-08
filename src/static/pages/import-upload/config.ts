import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { FileUploader } from 'src/third-sides/file-upload';

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
