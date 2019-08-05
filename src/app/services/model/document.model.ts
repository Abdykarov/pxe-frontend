export interface IResponseDataDocument {
    file: Blob;
    filename: string;
}

export enum IDocumentType {
    INFORMATION = 'INFORMATION',
    DENUNCIATION = 'DENUNCIATION',
    WITHDRAWAL = 'WITHDRAWAL',
    CONTRACT = 'CONTRACT',
}
