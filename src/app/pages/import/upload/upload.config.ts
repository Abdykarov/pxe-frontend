import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { FileUploader } from 'src/third-sides/file-upload';
import { environment } from 'src/environments/environment';

export const fileUploaderFactory = (authService: AuthService): FileUploader => {
    return new FileUploader( {
        url: `${environment.url_api}/v1.0/offer/batch-validate`,
        method: 'POST',
        disableMultipart: true,
        formatDataFunctionIsAsync: true,
        headers: [
            {
                name: 'Authorization',
                value: 'Bearer ' + authService.getToken(),
            },
            {
                name: 'X-API-Key',
                value: `${environment.x_api_key}`,
            },
            {
                name: 'content-type',
                value: CONSTS.IMPORT_OFFERS_TYPE,
            },
        ],
        formatDataFunction: async (item) => {
            const csvContent = await item._file.text();
            return new Promise( (resolve, reject) => {
                resolve(csvContent);
            });
        },
    });
};
