import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpResponse,
} from '@angular/common/http';

import { map } from 'rxjs/operators';

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
    ) {}

    public getDocument = (contractId: string, documentType: IDocumentType) => {
        return this.http.get<any>(
            `${environment.url_api}/v1.0/documents/${contractId}/${documentType}`,
            {
                observe: 'response',
                responseType: 'blob',
            })
            .pipe(
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
}
