import {
    Component,
    ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';

import * as R from 'ramda';
import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { supplierProfileFormFields } from 'src/common/containers/form/forms/supplier-profile/supplier-profile-form.config';
import { userProfileFormFields } from 'src/common/containers/form/forms/user-profile/user-profile-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IJwtPayload } from 'src/app/services/model/auth.model';
import { IUserDetailInput } from 'src/common/graphql/models/user.model';
import { IUserProfileModelForm } from 'src/common/containers/form/forms/user-profile/user-profile-form.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { UserService } from 'src/common/graphql/services/user.service';

@Component({
    templateUrl: './supplier-profile.component.html',
    styleUrls: ['./supplier-profile.component.scss'],
})
export class SupplierProfileComponent extends AbstractComponent {
    public fieldError: IFieldError = {};
    public userProfileFormFields = userProfileFormFields;
    public supplierProfileFormFields = supplierProfileFormFields;
    public formLoading = false;
    public formSent = false;
    public formValues: IJwtPayload;
    public globalError: string[] = [];

    public oldPhone = this.authService.currentUserValue.phoneNumber;
    public smsSent = false;
    public profileChanged = false;

    public supplierInfo = {
        companyName: 'Lundegaard a.s.',
        email: '500_tvrdy@lundegaard.eu',
    };

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
        private userService: UserService,
    ) {
        super();
        this.formValues = this.authService.currentUserValue;
    }

    public saveUserProfile = (userProfileModelForm: IUserProfileModelForm) => {
        this.formLoading = true;
        this.formSent = false;
        this.fieldError = {};
        this.globalError = [];

        const userDetailInput: IUserDetailInput = R.pick(['firstName', 'lastName', 'phoneNumber'], userProfileModelForm);
        userDetailInput.userName = this.authService.currentUserValue.email;

        this.userService.updateUserProfile(userDetailInput, userProfileModelForm.smsCode)
            .pipe(
                map(({data}) => data.updateUserProfile),
                switchMap((profileChanged: boolean) => {
                    this.profileChanged = profileChanged;
                    return this.authService.refreshToken();
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    if (this.profileChanged) {
                        this.smsSent = false;
                        this.oldPhone = this.authService.currentUserValue.phoneNumber;
                        this.formSent = true;
                        this.formValues = this.authService.currentUserValue;
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

    public sendChangePhoneNumberSmsMutation = (phoneNumber: string) => {
        this.userService.sendChangePhoneNumberSmsMutation(phoneNumber)
            .pipe(
                map(({data}) => data.sendChangePhoneNumberSms),
                takeUntil(this.destroy$),
            )
            .subscribe(
                (sendChangePhoneNumberSms) => {
                    this.formLoading = false;
                    this.smsSent = false;
                    if (!sendChangePhoneNumberSms) {
                        this.globalError = [defaultErrorMessage];
                    } else {
                        this.smsSent = true;
                    }
                    this.cd.markForCheck();
                },
                error => {
                    this.smsSent = false;
                    this.formLoading = false;
                    const { globalError, fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    this.cd.markForCheck();
                },
            );
    }

    // typ podle toho od kad bude chodit
    public saveSupplierProfile = (validData: any) => {
        this.formLoading = true;
        this.formSent = false;
        this.fieldError = {};
        this.globalError = [];
        console.log(validData);
    }
}
