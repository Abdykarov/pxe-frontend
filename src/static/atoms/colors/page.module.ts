import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ColorsPageComponent } from './page';

@NgModule({
    declarations: [ColorsPageComponent],
    exports: [ColorsPageComponent],
    imports: [BreadcrumbModule, CommonModule],
})
export class ColorsPageModule {}

export const colorsPageRoutes: Routes = [
    {
        path: 'colors',
        component: ColorsPageComponent,
    },
];
