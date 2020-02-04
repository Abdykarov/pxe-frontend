import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';

@NgModule({
    declarations: [
        UploadComponent,
    ],
    imports: [
        CommonModule,
        ProgressBarModule,
        UploadRoutingModule,
    ],
})
export class UploadModule { }
