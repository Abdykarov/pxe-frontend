import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileUploadModule } from 'ng2-file-upload';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { ListOfNotificationsModule } from 'src/common/ui/list-of-notifications/list-of-notifications.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';

@NgModule({
    declarations: [
        UploadComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        FileUploadModule,
        ListOfNotificationsModule,
        ProgressBarModule,
        UploadRoutingModule,
    ],
})
export class UploadModule { }
