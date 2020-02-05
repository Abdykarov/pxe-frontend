import { FileUploaderOptions } from 'ng2-file-upload';

export const fileUploaderOptions: FileUploaderOptions = {
    url: 'ahoj url',
    disableMultipart: true,
    formatDataFunctionIsAsync: true,
    formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
            resolve({
                    name: item._file.name,
                    length: item._file.size,
                    contentType: item._file.type,
                    date: new Date(),
                });
            });
        },
};

