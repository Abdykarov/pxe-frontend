import {
    Component,
    OnInit,
} from '@angular/core';

import { ImportProgressStep } from 'src/app/pages/import/import.model';
import {
    getConfigStepper,
    TypeStepper,
} from 'src/common/utils';

@Component({
    selector: 'pxe-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
    public configStepper = getConfigStepper(ImportProgressStep.UPLOAD, false, TypeStepper.IMPORT);

    constructor() { }

    ngOnInit() {
    }

}
