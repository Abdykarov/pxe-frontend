import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {FileUploader} from '../../../third-sides/file-upload';

@Component({
  templateUrl: './page.html',
})

export class AskForOfferFileUploaderComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public fileUploader = new FileUploader({
        url: 'none',
    });

    public files = [{
        name: '1QEQEWASD.pdf',
        uploaded: false,
    }, {
        name: '1QEQEWASD.pdf',
        uploaded: true,
    }];

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'File uploader',
                url: null,
            },
        ];
    }

    removeFile = (fileItem) => console.log('click');
    submitForm = (evt) => console.log('click');
}
