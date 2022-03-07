import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ButtonsPageComponent } from './page';

@NgModule({
    declarations: [ButtonsPageComponent],
    exports: [ButtonsPageComponent],
    imports: [BreadcrumbModule, ButtonModule, CommonModule],
})
export class ButtonsPageModule {}

export const buttonsPageRoutes: Routes = [
    {
        path: 'buttons',
        component: ButtonsPageComponent,
    },
];
