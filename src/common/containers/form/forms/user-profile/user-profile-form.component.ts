import {
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-user-form',
    templateUrl: './user-profile-form.component.html',
    styleUrls: ['./user-profile-form.component.scss'],
})
export class UserProfileFormComponent extends AbstractFormComponent implements OnInit {

    public currentUserValue: IJwtPayload;

    constructor(
        private authService: AuthService,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.fillForm();
    }

    public fillForm = () => {
        this.currentUserValue = this.authService.currentUserValue;
        this.form.get('email').setValue(this.currentUserValue.email);
        this.form.get('name').setValue(this.currentUserValue.firstname);
        // todo telephone
        // this.form.get('phone').setValue(this.currentUserValue);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form: IPersonalDataInputForm = {
                ...this.form.value,
                phone: R.concat(this.form.value.phonePrefix, this.form.value.phone),
            };
            this.submitAction.emit(form);
        }
    }
}
