import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ImportApprovalComponent } from 'src/static/pages/import-approval/page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        ImportApprovalComponent,
    ],
    exports: [
        ImportApprovalComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        ProgressBarModule,
    ],
})
export class ImportApprovalModule {}

export const importApprovalPageRoutes: Routes = [
    {
        path: 'import-approval',
        component: ImportApprovalComponent,
    },
];
