import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { DatepickerRangeModule } from 'src/common/ui/forms/datepicker-range/datepicker-range.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { FormsPageComponent } from './page';

@NgModule({
    declarations: [FormsPageComponent],
    exports: [FormsPageComponent],
    imports: [
        AddressWhispererModule,
        BreadcrumbModule,
        CommonModule,
        DatepickerModule,
        DatepickerRangeModule,
        FormModule,
        ReactiveFormsModule,
        SelectModule,
    ],
})
export class FormsPageModule {}

export const formsPageRoutes: Routes = [
    {
        path: 'forms',
        component: FormsPageComponent,
    },
];
