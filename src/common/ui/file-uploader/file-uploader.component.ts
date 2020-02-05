import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'pxe-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
    @Input()
    uploader: FileUploader;

    @Output()
    public fileSelectAction: EventEmitter<any> = new EventEmitter();

    hasBaseDropZoneOver = false;

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    fileDrop = () => {
        this.fileSelectAction.emit(this.uploader);
    }

    fileSelected = () => {
        this.fileSelectAction.emit(this.uploader);
    }
}
