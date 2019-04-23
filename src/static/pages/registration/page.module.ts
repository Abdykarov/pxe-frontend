import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { RegistrationPageComponent } from './page';
import { LoginType, SignType } from '../../../app/layouts/models/router-data.model';

@NgModule({
    declarations: [
        RegistrationPageComponent,
    ],
    exports: [
        RegistrationPageComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
    ],
})
export class RegistrationPageModule {}

export const registrationPageRoutes: Routes = [
    {
        path: 'registration',
        component: RegistrationPageComponent,
        data: {
            isPublic: true,
            loginType: LoginType.STATIC,
            signInType: SignType.NONE,
        },
    },
];
