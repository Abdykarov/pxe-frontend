import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { FormsPageComponent } from './page';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

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
