import {
    Component,
    ChangeDetectorRef,
} from '@angular/core';

import { Apollo } from 'apollo-angular';

import { AbstractComponent } from 'src/common/abstract.component';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { userProfileFormFields } from 'src/common/containers/form/forms/user-profile/user-profile-form.config';

@Component({
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent extends AbstractComponent {
    public formFields = userProfileFormFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};

    constructor(
        private apollo: Apollo,
        private cd: ChangeDetectorRef,
    ) {
        super();
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};

        console.log('AHOJ');
    }
}
