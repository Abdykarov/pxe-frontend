import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';
// own classes
import { ModalsPageComponent } from './page';

@NgModule({
    declarations: [ModalsPageComponent],
    exports: [ModalsPageComponent],
    imports: [BreadcrumbModule, ButtonModule, CommonModule, ModalModule],
})
export class ModalsPageModule {}

export const modalsPageRoutes: Routes = [
    {
        path: 'modals',
        component: ModalsPageComponent,
    },
];
