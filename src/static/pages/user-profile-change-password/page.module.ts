import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { UserProfileFormModule } from 'src/common/containers/form/forms/user-profile/user-profile-form.module';
import { UserProfileChangePasswordPageComponent } from 'src/static/pages/user-profile-change-password/page';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';

@NgModule({
    declarations: [
        UserProfileChangePasswordPageComponent,
    ],
    exports: [
        UserProfileChangePasswordPageComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        UserProfileFormModule,
    ],
})
export class UserProfileChangePasswordPageModule {}

export const userProfileChangePasswordPageRoutes: Routes = [
    {
        path: 'user-profile-change-password',
        component: UserProfileChangePasswordPageComponent,
        data: {
            isPublic: false,
        },
    },
];
