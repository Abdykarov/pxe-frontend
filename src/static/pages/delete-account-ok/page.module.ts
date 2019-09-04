import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DeleteAccountOkComponent } from './page';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';

@NgModule({
    declarations: [
        DeleteAccountOkComponent,
    ],
    exports: [
        DeleteAccountOkComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        VerificationFormModule,
    ],
})
export class DeleteAccountOkPageModule {}

export const deleteAccountOkPageRoutes: Routes = [
    {
        path: 'delete-account-ok',
        component: DeleteAccountOkComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
