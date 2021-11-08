import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';
import { LoginAfterRegistrationPageComponent } from './page';

@NgModule({
    declarations: [LoginAfterRegistrationPageComponent],
    exports: [LoginAfterRegistrationPageComponent],
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
            signUpType: SignType.STATIC,
        },
    },
];
