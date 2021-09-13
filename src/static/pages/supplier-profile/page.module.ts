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
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { UserProfileFormModule } from 'src/common/containers/form/forms/user-profile/user-profile-form.module';
import { SupplierProfilePageComponent } from './page';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';

@NgModule({
    declarations: [
        SupplierProfilePageComponent,
    ],
    exports: [
        SupplierProfilePageComponent,
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
        TooltipModule,
    ],
})
export class SupplierProfilePageModule {}

export const supplierProfilePageRoutes: Routes = [
    {
        path: 'supplier-profile',
        component: SupplierProfilePageComponent,
        data: {
            isPublic: false,
        },
    },
];
