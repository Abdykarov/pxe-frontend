import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { ModalsPageComponent } from './page';

// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        ModalsPageComponent,
    ],
    exports: [
        ModalsPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        ModalModule,
    ],
})
export class ModalsPageModule {}

export const modalsPageRoutes: Routes = [
    {
        path: 'modals',
        component: ModalsPageComponent,
    },
];
