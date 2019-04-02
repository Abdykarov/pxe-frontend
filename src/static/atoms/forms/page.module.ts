import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { FormsPageComponent } from './page';
import { FormModule } from 'src/common/ui/forms/form.module';

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
    ],
})
export class FormsPageModule {}

export const formsPageRoutes: Routes = [
    {
        path: 'forms',
        component: FormsPageComponent,
    },
];
