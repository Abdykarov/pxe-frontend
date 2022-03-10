import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
// own modules
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { DropdownPageComponent } from './page';

@NgModule({
    declarations: [DropdownPageComponent],
    exports: [DropdownPageComponent],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        DropdownModule,
        RouterModule,
    ],
})
export class DropdownPageModule {}

export const dropdownPageRoutes: Routes = [
    {
        path: 'dropdown',
        component: DropdownPageComponent,
    },
];
