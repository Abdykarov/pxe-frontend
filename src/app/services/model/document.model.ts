export interface IResponseDataDocument {
    file: Blob;
    filename: string;
}

export enum IDocumentType {
    INFORMATION = 'INFORMATION',
    UNSET_PROLONGATION = 'UNSET_PROLONGATION',
    DENUNCIATION = 'DENUNCIATION',
    WITHDRAWAL = 'WITHDRAWAL',
    CONTRACT = 'CONTRACT',
}
