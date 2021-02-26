import {
    HttpClient,
    HttpResponse,
} from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IResponseDataDocument } from 'src/app/services/model/document.model';

export const downloadFile = (httpClient: HttpClient, url: string): Observable<IResponseDataDocument> => {
    return httpClient.get(`${environment.url_api}/${url}`, {
        responseType: 'blob',
        observe: 'response',
    }).pipe(
        map((response: HttpResponse<any>): IResponseDataDocument => {
            const headers = response.headers.get('content-disposition');
            const filename = headers.split(';')[1].split('filename')[1]
                .split('=')[1].trim().replace(new RegExp('"', 'g'), '');

            return {
                file: response.body,
                filename,
            };
        }),
    );
};
