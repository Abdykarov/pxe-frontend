import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';
// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DeleteAccountOkSimpleComponent } from './page';

@NgModule({
    declarations: [DeleteAccountOkSimpleComponent],
    exports: [DeleteAccountOkSimpleComponent],
    imports: [ButtonModule, CommonModule, VerificationFormModule],
})
export class DeleteAccountOkSimplePageModule {}

export const deleteAccountOkSimplePageRoutes: Routes = [
    {
        path: 'delete-account-ok-simple',
        component: DeleteAccountOkSimpleComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
