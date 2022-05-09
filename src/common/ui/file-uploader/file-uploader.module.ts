import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'src/third-sides/file-upload';
import { FileUploaderComponent } from './file-uploader.component';

@NgModule({
    declarations: [FileUploaderComponent],
    exports: [FileUploaderComponent],
    imports: [CommonModule, FileUploadModule],
})
export class FileUploaderModule {}
