import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'src/common/utils/file-upload';


import { FileUploaderComponent } from './file-uploader.component';

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
