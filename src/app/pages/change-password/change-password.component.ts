import { Component } from '@angular/core';

import { changePasswordFields } from 'src/common/containers/form/forms/change-password/change-password-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';

@Component({
    selector: 'pxe-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
    public formFields = changePasswordFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public submitSupplyForm = (evt) => {
        console.log('clicked');
    }
}
