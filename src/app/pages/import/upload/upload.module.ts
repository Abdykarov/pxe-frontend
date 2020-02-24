import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/pipes.module';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FileUploaderModule } from 'src/common/ui/file-uploader/file-uploader.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { ListOfNotificationsModule } from 'src/common/ui/list-of-notifications/list-of-notifications.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';

@NgModule({
    declarations: [
        UploadComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FileUploaderModule,
        InfoBannerModule,
        ListOfNotificationsModule,
        PlaceloaderModule,
        PipesModule,
        ProgressBarModule,
        UploadRoutingModule,
    ],
})
export class UploadModule { }
