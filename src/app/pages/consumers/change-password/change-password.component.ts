import {
    Component,
    ChangeDetectorRef,
} from '@angular/core';

import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { changePasswordFields } from 'src/common/containers/form/forms/change-password/change-password-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IChangePassword } from 'src/app/pages/public/login/login.model';
import { ILoginResponse } from 'src/app/services/model/auth.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { UserService } from 'src/common/graphql/services/user.service';

@Component({
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent extends AbstractComponent {
    public fieldError: IFieldError = {};
    public formFields = changePasswordFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private userService: UserService,
    ) {
        super();
    }

    public submitForm = (changePassword: IChangePassword) => {
        this.formLoading = true;
        this.formSent = false;
        this.fieldError = {};
        this.globalError = [];

        this.userService.changePassword(changePassword.currentPassword, changePassword.password)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.changePassword),
            )
            .subscribe(
                (loginResponse: ILoginResponse) => {
                    this.authService.manageLoginResponse(loginResponse);
                    this.formSent = true;
                    this.formLoading = false;
                    this.cd.markForCheck();
                },
                error => {
                    this.globalError = [];
                    this.formLoading = false;
                    const { globalError, fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    this.cd.markForCheck();
                },
            );
    }
}
