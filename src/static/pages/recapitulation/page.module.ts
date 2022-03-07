import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { RecapitulationPageComponent } from './page';

@NgModule({
    declarations: [RecapitulationPageComponent],
    exports: [RecapitulationPageComponent],
    imports: [
        AddressWhispererModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        DatepickerModule,
        FieldWrapperModule,
        FormModule,
        PersonalInfoFormModule,
        ProgressBarModule,
        ReactiveFormsModule,
        SelectModule,
    ],
})
export class RecapitulationPageModule {}

export const recapitulationPageRoutes: Routes = [
    {
        path: 'recapitulation',
        component: RecapitulationPageComponent,
        data: {
            isPublic: false,
        },
    },
];
