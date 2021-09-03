import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { NewSupplyPointPageComponent } from './page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        NewSupplyPointPageComponent,
    ],
    exports: [
        NewSupplyPointPageComponent,
    ],
    imports: [
        AddressWhispererModule,
        AlertModule,
        BannerUIModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        DatepickerModule,
        FieldWrapperModule,
        FormModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SelectModule,
    ],
})
export class NewSupplyPointPageModule {}

export const newSupplyPointPageRoutes: Routes = [
    {
        path: 'new-supply-point',
        component: NewSupplyPointPageComponent,
        data: {
            isPublic: false,
        },
    },
];
