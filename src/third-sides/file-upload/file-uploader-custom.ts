import * as R from 'ramda';

import { FileItem } from './file-item.class';
import { FileUploader, FileUploaderOptions } from './file-uploader.class';

export class FileUploaderCustom extends FileUploader {
    constructor(options: FileUploaderOptions) {
        super(options);
    }
    uploadAllFiles(appendData: object): void {
        this.isUploading = true;
        const xhr = new XMLHttpRequest();
        const sendable = new FormData();
        const fakeitem: FileItem = null;
        this.onBuildItemForm(fakeitem, sendable);
        for (const item of this.queue) {
            item.isReady = true;
            item.isUploading = true;
            item.isUploaded = false;
            item.isSuccess = false;
            item.isCancel = false;
            item.isError = false;
            item.progress = 0;
            if (typeof item._file.size !== 'number') {
                throw new TypeError('The file specified is no longer valid');
            }
            sendable.append('files', item._file, item.file.name);
        }

        R.forEachObjIndexed((value, key) => sendable.append(key, value))(
            appendData,
        );

        if (this.options.additionalParameter !== undefined) {
            Object.keys(this.options.additionalParameter).forEach((key) => {
                sendable.append(key, this.options.additionalParameter[key]);
            });
        }
        xhr.onload = () => {
            this.isUploading = false;
            const gist =
                (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304
                    ? 'Success'
                    : 'Error';
            const method = 'on' + gist + 'Item';
            this[method](fakeitem, null, xhr.status, null);
        };
        xhr.onerror = () => {
            this.isUploading = false;
            this.onErrorItem(fakeitem, null, xhr.status, null);
        };
        xhr.onabort = () => {
            this.isUploading = false;
            this.onErrorItem(fakeitem, null, xhr.status, null);
        };

        // xhr.upload.onprogress = (event: any) => {
        //     const progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        //     this._onProgressItem(fakeitem, progress);
        // };

        xhr.open('POST', this.options.url, true);
        xhr.withCredentials = true;
        if (this.options.headers) {
            for (let _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
                const header = _a[_i];
                xhr.setRequestHeader(header.name, header.value);
            }
        }
        if (this.authToken) {
            xhr.setRequestHeader(this.authTokenHeader, this.authToken);
        }
        xhr.send(sendable);
    }
}
