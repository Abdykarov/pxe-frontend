import { Component } from '@angular/core';

import {
    configStepper,
    offer,
    personData,
} from './contract.config';
import { formFields } from 'src/common/containers/form/forms/contract/contract-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent {
    public configStepper = configStepper;

    public showOffer = true;
    public personData: IPersonalData = personData;
    public offer = offer;

    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formFields = formFields;

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }
}
