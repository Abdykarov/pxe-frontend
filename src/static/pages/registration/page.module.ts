import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { RegistrationPageComponent } from './page';

@NgModule({
    declarations: [
        RegistrationPageComponent,
    ],
    exports: [
        RegistrationPageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
    ],
})
export class RegistrationPageModule {}

export const registrationPageRoutes: Routes = [
    {
        path: 'registration',
        component: RegistrationPageComponent,
    },
];
