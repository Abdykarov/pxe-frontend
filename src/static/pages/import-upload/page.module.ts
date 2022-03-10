import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FileUploaderModule } from 'src/common/ui/file-uploader/file-uploader.module';
import { ListOfNotificationsModule } from 'src/common/ui/list-of-notifications/list-of-notifications.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { ImportUploadComponent } from './page';

@NgModule({
    declarations: [ImportUploadComponent],
    exports: [ImportUploadComponent],
    imports: [
        ButtonModule,
        BreadcrumbModule,
        CommonModule,
        FileUploaderModule,
        ListOfNotificationsModule,
        ProgressBarModule,
    ],
})
export class ImportUploadPageModule {}

export const importUploadPageRoutes: Routes = [
    {
        path: 'import-upload',
        component: ImportUploadComponent,
        data: {
            isPublic: false,
        },
    },
];
