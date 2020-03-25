import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'src/third-sides/file-upload';
import { transformHttpHeadersToFileUploaderFormat } from 'src/common/utils';

export const fileUploaderFactory = (authService: AuthService): FileUploader =>
    new FileUploader( {
        url: `${environment.url_api}/v1.0/offer/batch-validate`,
        method: 'POST',
        disableMultipart: true,
        formatDataFunctionIsAsync: true,
        headers: transformHttpHeadersToFileUploaderFormat(authService.getAuthorizationHeaders(CONSTS.IMPORT_OFFERS_TYPE)),
        formatDataFunction: async (item) => {
            const csvContent = await item._file.text();
            return new Promise( (resolve, reject) => {
                resolve(csvContent);
            });
        },
    });
