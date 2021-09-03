import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

// own classes
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FileUploaderModule } from 'src/common/ui/file-uploader/file-uploader.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { RegistrationPageComponent } from './page';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

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
        FileUploaderModule,
        FormModule,
        RouterModule,
        SupplierModule,
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
            signUpType: SignType.NONE,
        },
    },
];
