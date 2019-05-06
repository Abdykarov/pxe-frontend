import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginAfterRegistrationPageComponent } from './page';
import {
    LoginType,
    LogoutType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        LoginAfterRegistrationPageComponent,
    ],
    exports: [
        LoginAfterRegistrationPageComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        SupplierModule,
    ],
})
export class LoginAfterRegistrationPageModule {}

export const loginAfterRegistrationPageRoutes: Routes = [
    {
        path: 'login-after-registration',
        component: LoginAfterRegistrationPageComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            logoutType: LogoutType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
