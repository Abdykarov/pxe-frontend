import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { MicroTableModule } from 'src/common/ui/micro-table/micro-table.module';
import { MicroTablePageComponent } from './page';

@NgModule({
    declarations: [MicroTablePageComponent],
    exports: [MicroTablePageComponent],
    imports: [BreadcrumbModule, ButtonModule, CommonModule, MicroTableModule],
})
export class MicroTablePageModule {}

export const microTablePageRoutes: Routes = [
    {
        path: 'micro-table',
        component: MicroTablePageComponent,
    },
];
