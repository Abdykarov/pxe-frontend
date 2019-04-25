import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { FormsPageComponent } from './page';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule } from 'src/common/ui/forms/datepicker/datepicker.module';

@NgModule({
    declarations: [
        FormsPageComponent,
    ],
    exports: [
        FormsPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        DatepickerModule,
        FormModule,
        ReactiveFormsModule,
    ],
})
export class FormsPageModule {}

export const formsPageRoutes: Routes = [
    {
        path: 'forms',
        component: FormsPageComponent,
    },
];
