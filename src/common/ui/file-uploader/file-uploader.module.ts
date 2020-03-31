import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FileUploaderComponent } from './file-uploader.component';
import { FileUploadModule } from 'src/third-sides/file-upload';

@NgModule({
    declarations: [
        FileUploaderComponent,
    ],
    exports: [
        FileUploaderComponent,
    ],
    imports: [
        CommonModule,
        FileUploadModule,
    ],
})
export class FileUploaderModule {}
