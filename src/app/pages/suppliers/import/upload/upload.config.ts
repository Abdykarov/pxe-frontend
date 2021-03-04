import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { FileUploaderCustom } from 'src/third-sides/file-upload/file-uploader-custom';
import { transformHttpHeadersToFileUploaderFormat } from 'src/common/utils';

export const fileUploaderFactory = (
    url: string,
    itemAlias: string,
    withHeaders: boolean,
): Function => (authService: AuthService) => (new FileUploaderCustom( {
    url: `${environment.url_api}/v1.0/${url}`,
    itemAlias: itemAlias,
    headers: transformHttpHeadersToFileUploaderFormat(authService.getAuthorizationHeaders()),
}));
