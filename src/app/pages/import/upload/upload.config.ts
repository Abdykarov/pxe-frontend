import { FileUploaderOptions } from 'ng2-file-upload';

import { environment } from 'src/environments/environment';

export const fileUploaderOptions: FileUploaderOptions = {
    url: `${environment.url_api}/v1.0/offer/batch-import`,
    method: 'POST',
    disableMultipart: true,
    formatDataFunctionIsAsync: true,
    formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
            resolve({
                    name: item._file.name,
                    length: item._file.size,
                    date: new Date(),
                });
            });
        },
};
