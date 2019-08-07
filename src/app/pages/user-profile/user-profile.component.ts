import {
    Component,
    ChangeDetectorRef,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IUserDetailInput } from 'src/common/graphql/models/user.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { userProfileFormFields } from 'src/common/containers/form/forms/user-profile/user-profile-form.config';
import { UserService } from 'src/common/graphql/services/user.service';

@Component({
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent extends AbstractComponent {
    public fieldError: IFieldError = {};
    public formFields = userProfileFormFields;
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

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};

        const userDetailInput: IUserDetailInput = R.pick(['firstName', 'lastName', 'phoneNumber'], values);
        userDetailInput.userName = this.authService.currentUserValue.email;

        this.userService.updateUserProfile(userDetailInput)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.updateUserProfile),
            )
            .subscribe(
                (result: boolean) => {
                    this.formLoading = false;
                    if (result) {
                        this.formSent = true;
                        this.cd.markForCheck();
                    }
                },
                error => {
                    this.formLoading = false;
                    const { globalError, fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    this.cd.markForCheck();
                },
            );
    }
}
