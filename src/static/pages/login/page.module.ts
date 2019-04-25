import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LoginPageComponent } from './page';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

import { LoginType, SignType } from '../../../app/layouts/models/router-data.model';

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
            signInType: SignType.STATIC,
        },
    },
];
