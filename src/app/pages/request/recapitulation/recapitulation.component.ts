import { Component } from '@angular/core';

import { configStepper } from 'src/app/pages/request/recapitulation/recapitulation.config';
import { IStepperProgressItem } from 'src/common/ui/progress-bar/models/progress.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';

@Component({
    selector: 'pxe-recapitulation',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent {
    public stepperProgressConfig: IStepperProgressItem[] = configStepper;

    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public submitPersonalInfoForm = (evt) => {
        alert('formular odeslan');
    }
}
