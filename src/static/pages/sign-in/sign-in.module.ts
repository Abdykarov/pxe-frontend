import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import {
    LoginType,
    LogoutType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { SignInComponent } from './sign-in.component';
import { SignInFormModule } from 'src/common/ui/sign-in/sign-in-form.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        SignInComponent,
    ],
    exports: [
        SignInComponent,
    ],
    imports: [
        CommonModule,
        SignInFormModule,
        LayoutContainerModule,
        SupplierModule,
    ],
})
export class SignInModule { }

export const signInPageRoutes: Routes = [
    {
        path: 'sign-in',
        component: SignInComponent,
        data: {
            isPublic: true,
            isSimpleFooter: true,
            loginType: LoginType.STATIC,
            logoutType: LogoutType.NONE,
            signInType: SignType.NONE,
        },
    },
];
