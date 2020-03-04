import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { FileUploader } from 'src/third-sides/file-upload';

@Component({
    selector: 'pxe-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
    @Input()
    public uploader: FileUploader;

    @Output()
    public fileSelectAction: EventEmitter<any> = new EventEmitter();

    public hasBaseDropZoneOver = false;

    public fileOverBase = (evt) => {
        evt.preventDefault();
        this.hasBaseDropZoneOver = evt;
    }

    public fileDrop = (evt) => {
        evt.preventDefault();
        this.fileSelectAction.emit(this.uploader);
    }

    public fileSelected = (evt) => {
        evt.preventDefault();
        this.fileSelectAction.emit(this.uploader);
    }
}
