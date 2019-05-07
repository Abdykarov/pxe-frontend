import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';
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
        AlertModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        DatepickerModule,
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
    },
];
