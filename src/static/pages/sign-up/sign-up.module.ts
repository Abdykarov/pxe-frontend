import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import {
    LoginType,
    LogoutType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { SignUpComponent } from './sign-up.component';
import { SignUpFormModule } from 'src/common/ui/sign-up/sign-up-form.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        SignUpComponent,
    ],
    exports: [
        SignUpComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        SignUpFormModule,
        SupplierModule,
    ],
})
export class SignUpModule { }

export const signUpPageRoutes: Routes = [
    {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
            isPublic: true,
            isSimpleFooter: true,
            loginType: LoginType.STATIC,
            logoutType: LogoutType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
