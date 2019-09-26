import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginPageComponent } from './page';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        LoginPageComponent,
    ],
    exports: [
        LoginPageComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
        SupplierModule,
    ],
})
export class LoginPageModule {}

export const loginPageRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
