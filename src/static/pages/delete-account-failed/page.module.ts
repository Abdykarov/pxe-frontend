import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DeleteAccountFailedComponent } from './page';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@NgModule({
    declarations: [
        DeleteAccountFailedComponent,
    ],
    exports: [
        DeleteAccountFailedComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
    ],
})
export class DeleteAccountFailedPageModule {}

export const deleteAccountFailedPageRoutes: Routes = [
    {
        path: 'delete-account-failed',
        component: DeleteAccountFailedComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
