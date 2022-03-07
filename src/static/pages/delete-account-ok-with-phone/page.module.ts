import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';
// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DeleteAccountOkWithPhoneComponent } from './page';

@NgModule({
    declarations: [DeleteAccountOkWithPhoneComponent],
    exports: [DeleteAccountOkWithPhoneComponent],
    imports: [ButtonModule, CommonModule, VerificationFormModule],
})
export class DeleteAccountOkWithPhonePageModule {}

export const deleteAccountOkWithPhonePageRoutes: Routes = [
    {
        path: 'delete-account-ok-with-phone',
        component: DeleteAccountOkWithPhoneComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
