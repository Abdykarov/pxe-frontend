import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { FileUploader } from 'src/third-sides/file-upload';
import { transformHttpHeadersToFileUploaderFormat } from 'src/common/utils';

export const fileUploaderFactory = (authService: AuthService): FileUploader =>
    new FileUploader( {
        url: `${environment.url_api}/v1.0/offer/batch-validate`,
        itemAlias: 'offers',
        headers: transformHttpHeadersToFileUploaderFormat(authService.getAuthorizationHeaders()),
        filesCustomType: 'text/csv;charset=windows-1250 ',
    });
