import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ChangePasswordPageComponent } from './page';

@NgModule({
    declarations: [ChangePasswordPageComponent],
    exports: [ChangePasswordPageComponent],
    imports: [ButtonModule, CommonModule, FormModule],
})
export class ChangePasswordPageModule {}

export const changePasswordPageRoutes: Routes = [
    {
        path: 'change-password',
        component: ChangePasswordPageComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
