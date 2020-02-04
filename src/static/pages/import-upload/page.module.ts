import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { FileUploadModule } from 'ng2-file-upload';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ImportUploadComponent } from './page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        ImportUploadComponent,
    ],
    exports: [
        ImportUploadComponent,
    ],
    imports: [
        ButtonModule,
        BreadcrumbModule,
        CommonModule,
        FileUploadModule,
        ProgressBarModule,
    ],
})
export class ImportUploadPageModule {}

export const importUploadPageRoutes: Routes = [
    {
        path: 'import-upload',
        component: ImportUploadComponent,
    },
];
