import {
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
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

    @Input()
    public multiple = false;

    @Output()
    public fileSelectAction: EventEmitter<any> = new EventEmitter();

    @Input()
    public wrapperCustomClass = '';

    @Input()
    public id = 'file-upload';

    @Input()
    public mainTextCustomClass = '';

    @Input()
    public mainText = 'Přetáhněte vyplněnou excelovskou tabulku';

    @Input()
    public secondaryTextCustomClass = '';

    @Input()
    public secondaryText = 'nebo';

    @Input()
    public inputCustomClass = '';

    @Input()
    public labelCustomClass = '';

    @Input()
    public labelFromMainText = false;

    @Input()
    public contentTemplate?: TemplateRef<any>;

    public hasBaseDropZoneOver = false;
}
