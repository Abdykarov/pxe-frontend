import {
    HttpClient,
    HttpResponse,
} from '@angular/common/http';
import {
    Inject,
    Injectable,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {}

    public getDocument = (contractId: string, documentType: IDocumentType): Observable<IResponseDataDocument> => {
        return this.http.get(`${environment.url_api}/v1.0/documents/${contractId}/${documentType}`, {
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
    }

    public documentOpen = (data: IResponseDataDocument) => {
        const fileURL = URL.createObjectURL(data.file);
        if (isPlatformBrowser(this.platformId)) {
            window.open(fileURL);
        }
    }

    public documentSave = (data: IResponseDataDocument) => {
        saveAs(data.file, data.filename);
    }
}
