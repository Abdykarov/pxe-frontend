import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { NewSupplyPointPageComponent } from './page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        NewSupplyPointPageComponent,
    ],
    exports: [
        NewSupplyPointPageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        ButtonModule,
        FormModule,
        ProgressBarModule,
    ],
})
export class NewSupplyPointPageModule {}

export const newSupplyPointPageRoutes: Routes = [
    {
        path: 'new-supply-point',
        component: NewSupplyPointPageComponent,
    },
];
