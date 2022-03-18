import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { AddModule } from 'src/common/ui/add/add.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
// own classes
import { AddPageComponent } from './page';

@NgModule({
    declarations: [AddPageComponent],
    exports: [AddPageComponent],
    imports: [AddModule, BreadcrumbModule, CommonModule],
})
export class AddPageModule {}

export const addPageRoutes: Routes = [
    {
        path: 'add',
        component: AddPageComponent,
    },
];
