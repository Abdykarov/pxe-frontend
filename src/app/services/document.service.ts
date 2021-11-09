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

import { environment } from 'src/environments/environment';
import {
    IDocumentType,
    IResponseDataDocument,
} from 'src/app/services/model/document.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Injectable({
    providedIn: 'root',
})
export class DocumentService {
    public readonly contractNameTag = (identificationNumber) => `Smlouva-${identificationNumber}.pdf`;

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

    public documentOpen = (data: IResponseDataDocument, windowReference: Window = null): boolean => {
        if (isPlatformBrowser(this.platformId)) {
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(data.file, data.filename);
                return true;
            } else {
                const fileURL = URL.createObjectURL(data.file);
                if (windowReference) {
                    windowReference.location.assign(fileURL);
                    return false;
                } else {
                    window.open(fileURL);
                    return true;
                }
            }
        }
    }

    public processContractFilename = (data: IResponseDataDocument, supplyPoint?: ISupplyPoint) => {
        if (data.filename === 'Smlouva.pdf' && supplyPoint !== null) {
            return this.contractNameTag(supplyPoint.identificationNumber);
        } else {
            return data.filename;
        }
    }

    public documentSave = (data: IResponseDataDocument, supplyPoint: ISupplyPoint = null) => {
        if (isPlatformBrowser(this.platformId)) {
            saveAs(data.file, this.processContractFilename(data, supplyPoint));
        }
    }
}
