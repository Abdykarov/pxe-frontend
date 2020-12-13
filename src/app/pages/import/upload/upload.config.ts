import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'src/third-sides/file-upload';
import { transformHttpHeadersToFileUploaderFormat } from 'src/common/utils';

export const fileUploaderFactory = (
    url: string,
    itemAlias: string,
    withHeaders: boolean,
): Function => (authService: AuthService) => (new FileUploader( {
    url: `${environment.url_api}/v1.0/${url}`,
    itemAlias: itemAlias,
    ...(withHeaders) && {headers: transformHttpHeadersToFileUploaderFormat(authService.getAuthorizationHeaders())},
}));
